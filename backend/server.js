import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import messageRoutes from './routes/message.js'
import userRoutes from './routes/user.js'
import connectToDB from './db/mongoDB.js'

const app = express()
const port = process.env.PORT || 5000

dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.listen(port, () => {
  connectToDB()
  console.log('server is running on port 5000')
})
