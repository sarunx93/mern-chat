import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import type { ConversationType, ErrorType } from '../components/sidebar/Conversation'

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState<ConversationType[]>([])

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/users')
                const data: ConversationType[] | ErrorType = await res.json()
                if ('error' in data) {
                    throw new Error(data.error)
                }
                setConversations(data)
            } catch (error) {
                const err = error as Error
                toast.error(err.message)
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [])

    return { loading, conversations }
}

export default useGetConversations
