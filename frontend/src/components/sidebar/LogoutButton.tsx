import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout.js'

const LogoutButton = () => {
    const { logout } = useLogout()
    return (
        <div className='mt-auto'>
            <button onClick={logout} aria-label='logout'>
                <BiLogOut className='w-6 h-6 text-white cursor-pointer' />
            </button>
        </div>
    )
}
export default LogoutButton
