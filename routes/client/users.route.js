const express = require('express')
const router = express.Router()

// validates
const userValidate = require('../../validates/client/user.validate.js')

const usersController = require('../../controllers/client/users.controller.js')

router.get('/register',
  usersController.register
)

router.post('/register',
  userValidate.register,
  usersController.registerPost
)

module.exports = router
