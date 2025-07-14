import User from '../models/user'

export const login = (req, res) => {
  res.send('login')
}
export const logout = (req, res) => {
  res.send('logout')
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
  } catch (error) {}
  res.send('sign up')
}
