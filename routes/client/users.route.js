const express = require('express')
const router = express.Router()

const usersController = require('../../controllers/client/users.controller.js')

router.get('/register', 
  usersController.register
)

module.exports = router
