const productRouter = require('./product.route.js')
const homeRouter = require('./home.route.js')

module.exports = (app) => {
    app.use('/product', productRouter)
    app.use('/', homeRouter)
}