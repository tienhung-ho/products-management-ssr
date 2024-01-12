const express = require('express')
const router = express.Router()

const cartController = require('../../controllers/client/cart.controller.js')

router.get('/', cartController.index)

router.post('/add/:id', 
  cartController.add
)

router.get('/delete/:id', cartController.delete)


module.exports = router
