import { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'

type SocketContextType = {
    socket: Socket | null
    onlineUsers: string[]
}

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext<SocketContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    //add runtime check in hook
    const context = useContext(SocketContext)
    if (!context) {
        throw new Error('useSocketContext must be used within SocketContextProvider')
    }
    return context
}

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [onlineUsers, setOnlineUser] = useState([])
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser])
    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
    )
}
