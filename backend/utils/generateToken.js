import jwt from 'jsonwebtoken'

/**
 * @param {number} userId
 * @param {object} res
 * @returns {void}
 */
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  })

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // this helps prevent cross-stie attacks
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development'
  })
}

export default generateTokenAndSetCookie
