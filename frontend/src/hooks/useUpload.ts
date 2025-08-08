import { useState } from 'react'
import toast from 'react-hot-toast'

const useUpload = () => {
    const [upLoading, setUploading] = useState<boolean>(false)
    const [image, setImage] = useState<{ url: string; type: string; blob: string } | null>(null)

    const sendImage = async (img: any) => {
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('image', img)
            const res = await fetch('/api/upload/upload_img', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            return { url: data.url, type: data.type }
        } catch (error) {
            console.log(error)
            return null
        } finally {
            setUploading(false)
        }
    }

    return { sendImage, upLoading, image, setImage }
}

export default useUpload
