const express = require('express')
const router = express.Router()


const roomChatController = require('../../controllers/client/rooms-chat.controller.js')


router.get('/', 
roomChatController.index)

router.get('/create', 
roomChatController.create)

router.post('/create', 
roomChatController.createPost)



module.exports = router
