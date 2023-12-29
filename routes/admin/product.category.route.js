const express = require('express')
const router = express.Router()

// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

const productCategoryController = require('../../controllers/admin/product-category.controller.js')

router.get('/', productCategoryController.index)

router.get('/create', productCategoryController.create)

router.post(
    '/create', 
    upload.single('thumbnail'), 
    uploadCloud.upload, 
    productCategoryController.createPost
    )

module.exports = router