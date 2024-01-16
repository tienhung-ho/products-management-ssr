const express = require('express')
const router = express.Router()

// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

const  settingController = require('../../controllers/admin/setting.controller.js')


router.get('/general', settingController.general)
router.patch(
  '/general',
    upload.single('logo'), 
    uploadCloud.upload,
    settingController.generalPatch
)

module.exports = router
