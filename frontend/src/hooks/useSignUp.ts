import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

type Inputs = {
  fullName: string
  username: string
  password: string
  confirmPassword: string
  gender: string
}

const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { authUser, setAuthUser } = useAuthContext()

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

//put this in a helper file.
function handleInputErrors({ fullName, username, password, confirmPassword, gender }: Inputs) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill all the fields')
    return false
  }
  if (password !== confirmPassword) {
    toast.error('Password do not match')
    return false
  }
  if (password.length < 6) {
    toast.error('Password must be at least 6 characters.')
    return false
  }
  return true
}
