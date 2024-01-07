const express = require('express')
const router = express.Router()

const myAccountController = require('../../controllers/admin/my-account.controller.js')

// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

// validates

const validates = require('../../validates/admin/roles.validates.js')

// middlewrare permissions
const permissions = require('../../middlewares/admin/permissions.js')

router.get('/', myAccountController.index)

router.get('/edit', myAccountController.edit)
router.patch('/edit',
  upload.single('avatar'),
  uploadCloud.upload, 
  myAccountController.editPatch)

module.exports = router
