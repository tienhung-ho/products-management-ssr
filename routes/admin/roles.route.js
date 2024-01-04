const express = require('express')
const router = express.Router()

const rolesController = require('../../controllers/admin/roles.controller.js')

// validates

const validates = require('../../validates/admin/roles.validates.js')

router.get('/', rolesController.index)

router.get('/create', rolesController.create)
router.post('/create', 
            validates.createPost
            ,rolesController.createPost
)

router.delete('/delete/:id', rolesController.deleteItem)

router.get('/edit/:id', rolesController.edit)
router.patch('/edit/:id', rolesController.editPatch)

router.get('/permissions', rolesController.permissions)
router.patch('/permissions', rolesController.permissionsPatch)

module.exports = router
