import express from 'express'
import { getMessages, sendMessage, getLastMessage } from '../controllers/message.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.get('/get_last_message', protectRoute, getLastMessage)
router.get('/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessage)

export default router
