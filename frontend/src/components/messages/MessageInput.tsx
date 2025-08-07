import { BsSend } from 'react-icons/bs'
import { MdOutlineAttachFile } from 'react-icons/md'

import useSendMessage from '../../hooks/useSendMessage'
import useUpload from '../../hooks/useUpload'
import { useState } from 'react'

import type { ImageFileType } from '../../utils/types'

const MessageInput = () => {
    const [message, setMessage] = useState<string>('')
    const [img, setImg] = useState<ImageFileType>({
        file: null,
        url: '',
        blob: '',
        type: '',
    })
    const { loading, sendMessage } = useSendMessage()
    const { sendImage, setImage } = useUpload()

    const handleImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setImage(null)
        const data = await sendImage(e.target.files![0])
        await sendMessage(data?.url)
        if (e.target.files![0]) {
            setImage({
                blob: URL.createObjectURL(e.target.files![0]),
                url: data?.url,
                type: data?.type,
            })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!message && !img.file) return
        await sendMessage(message)
        setMessage('')
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
                <button className='absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer'>
                    {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
                </button>
                <label htmlFor='file' className='cursor-pointer'>
                    <MdOutlineAttachFile />
                </label>
                <input type='file' id='file' style={{ display: 'none' }} onChange={handleImg} />
            </div>
        </form>
    )
}
export default MessageInput
