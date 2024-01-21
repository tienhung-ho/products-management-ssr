const express = require('express')
const router = express.Router()

// middlewares
const authMiddelwares = require('../../middlewares/client/authorize.js')

// validates
const userValidate = require('../../validates/client/user.validate.js')

const usersController = require('../../controllers/client/users.controller.js')

router.get('/not-friend',
  usersController.notFriend
)

module.exports = router
