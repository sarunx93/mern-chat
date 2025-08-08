import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const [messageId, setMessageId] = useState('')
    const { messages, setMessages, selectedConversation } = useConversation()

    const sendMessage = async (message: string) => {
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation?._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
            const data = await res.json()
            console.log('message data', data)
            if (data.error) throw new data.error()
            setMessages([...messages, data])
            setMessageId(data._id)
        } catch (error) {
            const err = error as Error
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { sendMessage, loading, messageId }
}

export default useSendMessage
