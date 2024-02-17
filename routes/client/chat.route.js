const express = require('express')
const router = express.Router()


const chatController = require('../../controllers/client/chat.controller.js')

// middlewares
const chatMiddleware = require('../../middlewares/client/chat.middlewares.js')

router.get('/:roomId', 
chatMiddleware.isAccept,
chatController.index)



module.exports = router
