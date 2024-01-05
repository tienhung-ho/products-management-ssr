const express = require('express')
const router = express.Router()


// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

// // validate
// const validateProduct = require('../../validates/admin/product.validate.js')

const accountsController = require('../../controllers/admin/accounts.controller.js')

// middlewrare permissions
const permissions = require('../../middlewares/admin/permissions.js')

router.get('/', accountsController.index)

router.get('/create', accountsController.create)
router.post('/create',
  permissions.createAccount,
  upload.single('avatar'),
  uploadCloud.upload,
  accountsController.createPost
)

router.get('/edit/:id', accountsController.edit)
router.patch('/edit/:id',
  permissions.editAccount,
  upload.single('avatar'),
  uploadCloud.upload,
  accountsController.editPatch
)


module.exports = router
