import { useSocketContext } from '../../context/SocketContext.tsx'
import useConversation from '../../zustand/useConversation.ts'

type Props = {
    conversation: ConversationType
    emoji?: string
    lastIndex: boolean
}

//actually a user
export type ConversationType = {
    _id: string
    fullName: string
    username: string
    gender: string
    profilePic: string
    createdAt: Date
    updatedAt: Date
}

export type ErrorType = {
    error: string
}

const Conversation = (props: Props) => {
    const { conversation, lastIndex } = props

    const { selectedConversationUser, setSelectedConversationUser } = useConversation()
    // const { globalMessages } = useMessageContext()

    const isSelected = selectedConversationUser?._id === conversation?._id
    const { onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id)
    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
                    isSelected ? 'bg-sky-500' : ''
                }`}
                onClick={() => setSelectedConversationUser(conversation)}
                data-testid='conversation'>
                <div className={`avatar ${isOnline ? 'avatar-online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePic} alt='user avatar' />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                    </div>
                    {/* <p>{preview}</p> */}
                </div>
            </div>

            {!lastIndex && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}
export default Conversation
