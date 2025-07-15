import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'

export const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid Credentials' })
    }

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    })
  } catch (error) {
    console.log('Error in login controller', error.message)
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log('Error in login controller', error.message)
  }
}

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' })
    }
    const user = await User.findOne({ username })

    if (user) {
      return res.status(400).json({ error: 'User already exists.' })
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const profilePic = 'https://api.dicebear.com/9.x/lorelei/svg'

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    })

    generateTokenAndSetCookie(newUser._id, res)
    await newUser.save()
    res.status(201).json({
      _id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server Error' })
  }
}
