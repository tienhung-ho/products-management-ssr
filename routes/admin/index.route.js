const dashboardRouter = require('./dashboard.route.js')
const productRouter = require('./product.route.js')
const productCategoryRouter = require('./product.category.route.js')
const rolesRouter = require('./roles.route.js')
const accountRouter = require('./accounts.route')
const authorizeRouter = require('./authorize.route')
const myAccountRouter = require('./my-account.ruote.js')
const settingGeneralRouter = require('./setting.route.js')

// Authorize middleware
const authorizeMiddle = require('../../middlewares/admin/authorize.js')

// controller
const authorizeController = require('../../controllers/admin/authorize.controller.js')

module.exports = (app) => {
    const PATH_ADMIN = '/' + app.locals.prefixAdmin

    app.use(PATH_ADMIN, authorizeController.login)

    app.use(PATH_ADMIN + '/dashboard', 
    authorizeMiddle.requireAuthorize,
    dashboardRouter)

    app.use(PATH_ADMIN + '/product', authorizeMiddle.requireAuthorize, productRouter)

    app.use(PATH_ADMIN + '/product-category', authorizeMiddle.requireAuthorize, productCategoryRouter)

    app.use(PATH_ADMIN + '/roles', authorizeMiddle.requireAuthorize, rolesRouter)

    app.use(PATH_ADMIN + '/accounts', authorizeMiddle.requireAuthorize, accountRouter)

    app.use(PATH_ADMIN + '/auth', authorizeRouter)

    app.use(PATH_ADMIN + '/my-account', authorizeMiddle.requireAuthorize, myAccountRouter)

    app.use(PATH_ADMIN + '/settings', authorizeMiddle.requireAuthorize, settingGeneralRouter)

}   
