import useGetMessages from '../../hooks/useGetMessages'
import Message from './Message'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import { useEffect, useRef } from 'react'
import useListenMessages from '../../hooks/useListenMessages'
import type { MessageType } from '../../utils/types'

const Messages = () => {
    const { messages, loading } = useGetMessages()
    useListenMessages()
    const lastMessageRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 150)
    }, [messages])

    console.log('messages', messages)
    return (
        <div className='px-4 flex-1 overflow-auto'>
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
                <p className='text-center'>Send a message to start the conversation.</p>
            )}
            {!loading &&
                messages.length > 0 &&
                messages.map((message: MessageType) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message key={message._id} message={message} />
                    </div>
                ))}
        </div>
    )
}
export default Messages
