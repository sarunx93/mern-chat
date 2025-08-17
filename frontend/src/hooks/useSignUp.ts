import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { type Inputs } from '../utils/helpers'
import { handleInputErrors } from '../utils/helpers'

const useSignUp = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const { setAuthUser } = useAuthContext()

    const signup = async ({ fullName, username, password, confirmPassword, gender }: Inputs) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender })
        if (!success) return

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data)
        } catch (error) {
            const err = error as Error
            console.error(error)
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }
    return { loading, signup }
}
export default useSignUp
