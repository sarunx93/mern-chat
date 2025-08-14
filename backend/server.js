import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import messageRoutes from './routes/message.js'
import userRoutes from './routes/user.js'
import uploadRoutes from './routes/upload.js'
import connectToDB from './db/mongoDB.js'

import { app, server } from './socket/socket.js'

const port = process.env.PORT || 5000

const __dirname = path.resolve()

dotenv.config()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')))

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})

server.listen(port, () => {
    connectToDB()
    console.log('server is running on port 5000')
})
