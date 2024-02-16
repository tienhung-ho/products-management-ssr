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

router.get('/request',
  usersController.request
)

router.get('/accept',
  usersController.accept
)

router.get('/friends',
  usersController.friends
)


module.exports = router
