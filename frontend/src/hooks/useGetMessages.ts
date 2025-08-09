import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversationUser } = useConversation()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/messages/${selectedConversationUser?._id}`)
                const data = await res.json()
                if (data.error) throw new Error(data.error)
                setMessages(data)
            } catch (error) {
                const err = error as Error
                toast.error(err.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversationUser?._id) getMessages()
    }, [selectedConversationUser?._id, setMessages])
    return { messages, loading }
}

export default useGetMessages
