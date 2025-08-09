import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const uploadImage = async (req, res) => {
    const filePath = req.file?.path
    if (!filePath) {
        return res.status(400).json({ msg: 'No file uploaded.' })
    }
    try {
        const result = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath)
        res.status(200).json({ url: result.secure_url, type: result.resource_type })
    } catch (error) {
        console.error('upload image', error)
        res.status(400).json({ msg: error.message })
    }
}
