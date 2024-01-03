const express = require('express')
const router = express.Router()

// multer storage
const multer = require('multer')
const upload = multer()

// cloud storage
const uploadCloud = require('../../middlewares/admin/uploadCloud.js')

const rolesController = require('../../controllers/admin/roles.controller.js')

// validates

const validates = require('../../validates/admin/roles.validates.js')

router.get('/', rolesController.index)

router.get('/create', rolesController.create)
router.post('/create', 
            validates.createPost
            ,rolesController.createPost
          )


module.exports = router
