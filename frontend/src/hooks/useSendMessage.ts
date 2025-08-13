import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const [messageId, setMessageId] = useState('')
    const { messages, setMessages, selectedConversationUser } = useConversation()

    const sendMessage = async (message: string) => {
        try {
            const res = await fetch(`/api/messages/send/${selectedConversationUser?._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
            const data = await res.json()
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
