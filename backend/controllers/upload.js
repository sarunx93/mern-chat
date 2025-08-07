import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const image = '../images/1442161322-image-o.jpg'

export const uploadImage = async (req, res) => {
    const filePath = req.file?.path

    try {
        const result = await cloudinary.uploader.upload(filePath)
        res.status(200).json({ url: result.secure_url, type: result.resource_type })
    } catch (error) {
        console.error('upload image', error)
        res.status(400).json({ msg: error.message })
    }
}
