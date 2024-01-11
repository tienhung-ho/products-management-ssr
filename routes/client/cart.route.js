const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/client/cart.controller.js')

router.post('/add/:id', 
  cartController.index
)

module.exports = router
