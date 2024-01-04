const express = require('express')
const router = express.Router()


// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

// // validate
// const validateProduct = require('../../validates/admin/product.validate.js')

const authController = require('../../controllers/admin/authorize.controller.js')

router.get('/login', authController.login)
router.post('/login', authController.loginPost)



module.exports = router
