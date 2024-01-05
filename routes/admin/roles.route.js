const express = require('express')
const router = express.Router()

const rolesController = require('../../controllers/admin/roles.controller.js')

// validates

const validates = require('../../validates/admin/roles.validates.js')

// middlewrare permissions
const permissions = require('../../middlewares/admin/permissions.js')

router.get('/', rolesController.index)

router.get('/create', rolesController.create)
router.post('/create',
            permissions.createRole,
            validates.createPost
            ,rolesController.createPost
)

router.delete('/delete/:id', 
permissions.deleteRole,
rolesController.deleteItem)

router.get('/edit/:id', rolesController.edit)
router.patch('/edit/:id', 
permissions.editRole,
rolesController.editPatch)

router.get('/permissions', rolesController.permissions)
router.patch('/permissions', 
permissions.permissionsRole,
rolesController.permissionsPatch)

module.exports = router
