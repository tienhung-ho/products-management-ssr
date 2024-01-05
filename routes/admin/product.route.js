const express = require('express')
const router = express.Router()


// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

// validate
const validateProduct = require('../../validates/admin/product.validate.js')

const productController = require('../../controllers/admin/product.controller.js')

// middlewrare permissions
const permissions = require('../../middlewares/admin/permissions.js')


router.patch('/change-status/:status/:id', 
permissions.editProduct,
productController.changeStatus)

router.patch('/change-multi', 
permissions.editProduct,
productController.changeMulti)

router.delete('/delete/:id', 
permissions.deleteProduct,
productController.deleteItem)

router.get('/create', productController.create)

router.post(
  '/create',
    permissions.createProduct,
    upload.single('thumbnail'), 
    uploadCloud.upload,
    validateProduct.createPost,
    productController.createPost,
)

router.get('/edit/:id', productController.edit)

router.patch(
    '/edit/:id',
    permissions.editProduct,
    upload.single('thumbnail'),
    uploadCloud.upload,
    validateProduct.createPost,
    productController.editPatch
)

router.get('/details/:id', productController.details)

router.get('/', productController.index)

module.exports = router
