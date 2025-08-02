import { createContext, useContext, useState } from 'react'

type AuthUser = {
    fullName: string
    profilePic: string
    username: string
    _id: string
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({})

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<AuthUser | null>(
        JSON.parse(localStorage.getItem('chat-user') as string) || null
    )
    console.log('auth user', authUser)
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}
