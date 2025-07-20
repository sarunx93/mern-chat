import { useState } from 'react'
import toast from 'react-hot-toast'

type Inputs = {
  fullName: string
  username: string
  password: string
  confirmPassword: string
  gender: string
}

const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false)

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
      console.log(data)
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
