import { createContext, useContext, useState } from 'react'

type AuthUser = {
    fullName: string
    profilePic: string
    username: string
    _id: string
}

export type AuthContextType = {
    authUser: AuthUser | null
    setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider.')
    }
    return context
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(
        JSON.parse(localStorage.getItem('chat-user') as string) || null
    )
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}
