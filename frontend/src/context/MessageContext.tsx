import { createContext, useContext, useEffect, useState } from 'react'
import useGetMessages from '../hooks/useGetMessages'
import type { MessageType } from '../utils/types'

type MessageContextType = {
    globalMessages: MessageType[] | null
}

const MessageContext = createContext<MessageContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useMessageContext = () => {
    const context = useContext(MessageContext)
    if (!context) {
        throw new Error('useMessageContext must be used within an MessageContextProvide')
    }
    return context
}

export const MessageContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [globalMessages, setGlobalMessages] = useState<MessageType[] | null>(null)
    const { messages } = useGetMessages()
    useEffect(() => {
        setGlobalMessages(messages)
    }, [])
    return (
        <MessageContext.Provider
            value={{
                globalMessages,
            }}>
            {children}
        </MessageContext.Provider>
    )
}
