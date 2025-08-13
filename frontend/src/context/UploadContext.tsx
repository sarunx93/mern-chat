import { createContext, useContext, useState } from 'react'
import useSendMessage from '../hooks/useSendMessage'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import { useAuthContext } from './AuthContext'
import type { MessageType } from '../utils/types'

type UploadContextType = {
    upLoading: boolean
    messageId: string
    setUploading: React.Dispatch<React.SetStateAction<boolean>>
    image: { url: string; type: string; blob: string } | null
    setImage: React.Dispatch<
        React.SetStateAction<{ url: string; type: string; blob: string } | null>
    >
    sendImage: (img: any) => Promise<{ url: string; type: string } | null>
    sendMessage: (message: string, isImg?: boolean) => Promise<void>
}

const UploadContext = createContext<UploadContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useUploadContext = () => {
    const context = useContext(UploadContext)
    if (!context) {
        throw new Error('useUploadContext must be used within an UploadContextProvide')
    }
    return context
}

export const UploadContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [upLoading, setUploading] = useState(false)
    const [image, setImage] = useState<{ url: string; type: string; blob: string } | null>(null)
    const [loading, setLoading] = useState(false)
    const [messageId, setMessageId] = useState('')
    const { messages, setMessages, selectedConversationUser } = useConversation()
    const { authUser } = useAuthContext()
    const tempId = uuidv4()

    const sendImage = async (img: File) => {
        setUploading(true)
        const tempMessage = {
            _id: tempId,
            senderId: authUser?._id || '', // replace with real user
            receiverId: selectedConversationUser?._id || '',
            message: 'Uploading...',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            shouldShake: false,
            isTemp: true,
        }
        setMessages([...messages, tempMessage])

        try {
            const formData = new FormData()
            formData.append('image', img)
            const res = await fetch('/api/upload/upload_img', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            setMessages((prev) => prev.map((msg) => (msg._id === tempId ? data : msg)))
            return { url: data.url, type: data.type }
        } catch (error) {
            console.log(error)
            return null
        } finally {
            setUploading(false)
        }
    }

    const sendMessage = async (message: string, isImage: boolean) => {
        try {
            const res = await fetch(`/api/messages/send/${selectedConversationUser?._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message, isImage }),
            })
            const data = await res.json()
            if (data.error) throw new data.error()

            setMessages([...messages, data])
        } catch (error) {
            const err = error as Error
            toast.error(err.message)
        } finally {
            setLoading(false)
            setUploading(false)
        }
    }

    return (
        <UploadContext.Provider
            value={{
                upLoading,
                setUploading,
                image,
                setImage,
                sendImage,
                sendMessage,
                messageId,
            }}>
            {children}
        </UploadContext.Provider>
    )
}
