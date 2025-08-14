import { useAuthContext } from '../../context/AuthContext'
import { useUploadContext } from '../../context/UploadContext'
import { extractTime } from '../../utils/extractTime'
import useConversation from '../../zustand/useConversation'

type Props = {
    key: string
    message: {
        isImage?: boolean
        _id: string
        senderId: string
        receiverId: string
        message: string
        createdAt: string
        updatedAt: string
        shouldShake?: boolean
        isTemp?: boolean
        type?: string
    }
}

const Message = ({ message }: Props) => {
    const { authUser } = useAuthContext()
    const { selectedConversationUser } = useConversation()
    const fromMe = message.senderId === authUser?._id
    const formattedTime = extractTime(message.createdAt)
    const chatClassName = fromMe ? 'chat-end' : 'chat-start'
    const profilePic = fromMe ? authUser.profilePic : selectedConversationUser?.profilePic
    const bubbleBgColor = fromMe ? 'bg-blue-500' : ''
    const shakeClasss = message.shouldShake ? 'shake' : ''

    const { upLoading, image } = useUploadContext()

    // const isImg = message.message.includes('')

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePic} alt='chat bubble' />
                </div>
            </div>

            <>
                <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClasss} pb-2`}>
                    {upLoading && message.isTemp ? (
                        <div className='block max-w-sm h-auto rounded-lg opacity-5'>
                            <img src={image?.blob} />{' '}
                        </div>
                    ) : message.isImage ? (
                        <img
                            src={message.message}
                            alt='sent image'
                            className='rounded-lg'
                        />
                    ) : (
                        <p className="break-words">{message.message}</p>
                    )}
                </div>
                <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                    {formattedTime}
                </div>
            </>
        </div>
    )
}
export default Message
