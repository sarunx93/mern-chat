import { uploadImage } from '../controllers/upload.js'
import express from 'express'
import multer from 'multer'

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const extension = file.mimetype.split('/')[1]
        cb(null, `img-${Date.now()}.${extension}`)
    },
})

//to test if the uploaded file is an image

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('not an image', 400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

const router = express.Router()

router.post('/upload_img', upload.single('image'), uploadImage)

export default router
