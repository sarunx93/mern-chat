import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import io from 'socket.io-client'

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext({})

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState<any | null>(null)
    const [onlineUsers, setOnlineUser] = useState([])
    const { authUser } = useAuthContext()
    //@ts-ignore
    useEffect(() => {
        if (authUser) {
            // backend url
            const socket = io('http://localhost:5000', {
                query: {
                    userId: authUser._id,
                },
            })
            setSocket(socket)
            socket.on('getOnlineUsers', (users) => {
                setOnlineUser(users)
            })

            return () => socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
    )
}
