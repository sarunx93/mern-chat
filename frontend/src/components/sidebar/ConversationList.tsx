import useGetConversations from '../../hooks/useGetConversations'
import Conversation, { type ConversationType } from './Conversation'
import { getRandomEmoji } from '../../utils/emoji'

const ConversationList = () => {
    const { loading, conversations } = useGetConversations()

    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.map((conversation: ConversationType, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIndex={idx === conversations.length - 1}
                />
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    )
}
export default ConversationList
