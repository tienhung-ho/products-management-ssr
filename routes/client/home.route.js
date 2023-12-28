const express = require('express')
const router = express.Router()

const homeController = require('../../controllers/client/home.controller.js')

router.get('/', homeController.index)

module.exports = router