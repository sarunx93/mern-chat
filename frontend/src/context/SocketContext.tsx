import { createContext, useContext, useEffect, useState, type JSX } from 'react'
import { useAuthContext } from './AuthContext'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext({})

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [onlineUsers, setOnlineUser] = useState([])
    //@ts-expect-error {} is defined in useAuthContext
    const { authUser } = useAuthContext()
    //@ts-expect-error aaa
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
