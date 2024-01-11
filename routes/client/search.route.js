const express = require('express')
const router = express.Router()

const searchController = require('../../controllers/client/search.controller.js')

router.get('/', 
  searchController.index
)

module.exports = router
