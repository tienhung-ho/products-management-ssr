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

router.get('/login',
  usersController.login
)
router.post('/login',
  usersController.loginPost
)

router.get('/logout', usersController.logout)

router.get('/password/forgot', usersController.forgotPassWord)
router.post('/password/forgot', usersController.forgotPassWordPost)

router.get('/password/otp', usersController.otpPassword)
router.post('/password/otp', usersController.otpPasswordPost)
module.exports = router
