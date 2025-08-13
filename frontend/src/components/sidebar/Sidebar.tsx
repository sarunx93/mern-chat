import ConversationList from './ConversationList'
import SearchInput from './SearchInput'
import LogoutButton from './LogoutButton'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation'
const Sidebar = () => {
    const { authUser } = useAuthContext()
    const { selectedConversationUser } = useConversation()
    return (
        <div
            className={`${
                selectedConversationUser ? 'hidden' : 'flex'
            } border-r border-slate-500 p-4 md:flex flex-col`}>
            <h1>{authUser?.username}</h1>
            <SearchInput />
            <div className='divider px-3'></div>
            <ConversationList />
            <LogoutButton />
        </div>
    )
}
export default Sidebar
