import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import connectToDB from './db/mongoDB.js'

dotenv.config()

const app = express()

const port = process.env.PORT || 5000

app.use('/api/auth', authRoutes)

app.listen(port, () => {
  connectToDB()
  console.log('server is running on port 5000')
})
