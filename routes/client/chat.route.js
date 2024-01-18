const express = require('express')
const router = express.Router()


const chatController = require('../../controllers/client/chat.controller.js')

router.get('/', chatController.index)



module.exports = router
