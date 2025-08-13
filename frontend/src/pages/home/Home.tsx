import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
// import SidebarSmallScreen from '../../components/sidebar/SidebarSmallScreen'

const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg md:overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 min-h-0 h-screen'>
      <Sidebar />
      <MessageContainer />
    </div>
  )
}
export default Home
