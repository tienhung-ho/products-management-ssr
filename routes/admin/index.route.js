const dashboardRouter = require('./dashboard.route.js')
const productRouter = require('./product.route.js')
const productCategoryRouter = require('./product.category.route.js')
const rolesRouter = require('./roles.route.js')
const accountRouter = require('./accounts.route')
const authorizeRouter = require('./authorize.route')

module.exports = (app) => {
    const PATH_ADMIN = '/' + app.locals.prefixAdmin

    app.use(PATH_ADMIN + '/dashboard', dashboardRouter)

    app.use(PATH_ADMIN + '/product', productRouter)

    app.use(PATH_ADMIN + '/product-category', productCategoryRouter)

    app.use(PATH_ADMIN + '/roles', rolesRouter)

    app.use(PATH_ADMIN + '/accounts', accountRouter)

    app.use(PATH_ADMIN + '/auth', authorizeRouter)

}   
