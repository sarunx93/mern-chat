import ConversationList from './ConversationList'
import SearchInput from './SearchInput'
import LogoutButton from './LogoutButton'
const Sidebar = () => {
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <SearchInput />
            <div className='divider px-3'></div>
            <ConversationList />
            <LogoutButton />
        </div>
    )
}
export default Sidebar
