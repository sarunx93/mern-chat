import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime'
import useConversation from '../../zustand/useConversation'

type Props = {
    key: number
    message: {
        _id: string
        senderId: string
        receiverId: string
        message: string
        createdAt: string
        updatedAt: string
        shouldShake?: boolean
    }
}

const Message = ({ message }: Props) => {
    const { authUser } = useAuthContext()
    const { selectedConversation } = useConversation()
    const fromMe = message.senderId === authUser._id
    const formattedTime = extractTime(message.createdAt)
    const chatClassName = fromMe ? 'chat-end' : 'chat-start'
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
    const bubbleBgColor = fromMe ? 'bg-blue-500' : ''
    const shakeClasss = message.shouldShake ? 'shake' : ''

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePic} alt='chat bubble' />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClasss} pb-2`}>
                {message.message}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {formattedTime}
            </div>
        </div>
    )
}
export default Message
