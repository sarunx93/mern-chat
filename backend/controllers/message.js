import Conversation from '../models/conversation.js'
import Message from '../models/message.js'
import { getReceiverSocketId, io } from '../socket/socket.js'

export const sendMessage = async (req, res) => {
    try {
        const { message, isImage } = req.body
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
            isImage,
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
        res.status(400).json({ error: error.message })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate({ path: 'messages'} )
        // }).populate({ path: 'messages', options: { sort: { createdAt: -1 } } })

        if (!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        console.log('Error in sendMessage controller', error.message)
        res.status(400).json({ error: error.message })
    }
}

export const getLastMessage = async (req, res) => {
    const userId = req.user._id
    const lastMessages = await Conversation.find({
        participants: userId,
    }).populate({
        path: 'messages',
        options: { sort: { createdAt: -1 }, limit: 1 },
    })

    res.status(200).json(lastMessages)
}
