const express = require('express')
const router = express.Router()

const checkoutController = require('../../controllers/client/checkout.controller.js')

router.get('/', checkoutController.index)


module.exports = router
