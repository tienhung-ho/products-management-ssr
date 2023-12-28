const dashboardRouter = require('./dashboard.route.js')
const productRouter = require('./product.route.js')

module.exports = (app) => {
    const PATH_ADMIN = '/' + app.locals.prefixAdmin
    app.use(PATH_ADMIN + '/dashboard', dashboardRouter)
    app.use(PATH_ADMIN + '/product', productRouter)
}   