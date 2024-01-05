const express = require('express')
const router = express.Router()

// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

const productCategoryController = require('../../controllers/admin/product-category.controller.js')

// middlewrare permissions
const permissions = require('../../middlewares/admin/permissions.js')


router.get('/', productCategoryController.index)

router.get('/create', productCategoryController.create)
router.post(
    '/create', 
    permissions.createProductCate,
    upload.single('thumbnail'), 
    uploadCloud.upload,
    productCategoryController.createPost
    )

router.get(
  '/edit/:id',
  productCategoryController.edit
)
router.patch(
  '/edit/:id',
  permissions.createProductCate, 
  upload.single('thumbnail'), 
  uploadCloud.upload, 
  productCategoryController.editPatch
  )

module.exports = router
