import Conversation from '../models/conversation.js'
import Message from '../models/message.js'
import { getReceiverSocketId, io } from '../socket/socket.js'

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        // this will run line by line
        // await conversation.save()
        // await newMessage.save()

        await Promise.all([conversation.save(), newMessage.save()])

        //real time message.
        const receiverSockedId = getReceiverSocketId(receiverId)
        if (receiverSockedId) {
            //send events to a specific client.
            io.to(receiverSockedId).emit('newMessage', newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        console.log('Error in sendMessage controller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate('messages')

        if (!conversation) return res.status(200).json([])
        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        console.log('Error in sendMessage controller', error.message)
        res.status(500).json({ error: 'Internal Server Error' })
    }
}
