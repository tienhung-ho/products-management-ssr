const express = require('express')
const router = express.Router()

const productController = require('../../controllers/client/product.controller.js')

router.get('/details/:slug', productController.details)

router.get('/add', productController.add)

router.get('/', productController.index)

module.exports = router