import { toast } from 'react-hot-toast'

export type Inputs = {
    fullName: string
    username: string
    password: string
    confirmPassword: string
    gender: string
}

//put this in a helper file.
export function handleInputErrors({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
}: Inputs) {
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
