import { BsSend } from 'react-icons/bs'
import { MdOutlineAttachFile } from 'react-icons/md'

import useSendMessage from '../../hooks/useSendMessage'
import { useState } from 'react'

import { useUploadContext } from '../../context/UploadContext'

const MessageInput = () => {
    const [message, setMessage] = useState<string>('')
    const { loading } = useSendMessage()
    const { sendImage, setImage, sendMessage, setUploading, image } = useUploadContext()

    const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        //show preview immediately
        const file = e.target.files![0]
        if (!file) return
        setImage({
            blob: URL.createObjectURL(file),
            url: '',
            type: file.type || '',
        })

        const data = await sendImage(file)
        if (typeof data?.url === 'string') {
            await sendMessage(data?.url, true)
            setImage({
                blob: URL.createObjectURL(file),
                url: data.url,
                type: data.type,
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!message && !image) return
        setUploading(true)
        await sendMessage(message)
        setMessage('')
        setImage(null)
    }

    return (
        <form className='px-4 my-3' onSubmit={handleSubmit}>
            <div className='w-full relative'>
                <input
                    type='text'
                    className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
                    placeholder='Send a message'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className='absolute inset-y-0 end-0 flex items-center gap-2 pe-3'>
                    <label htmlFor='file' className='cursor-pointer'>
                        <MdOutlineAttachFile />
                    </label>
                    <input type='file' id='file' style={{ display: 'none' }} onChange={handleImg} />
                    <button type='submit' className='flex items-center cursor-pointer'>
                        {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                    </button>
                </div>
            </div>
        </form>
    )
}
export default MessageInput
