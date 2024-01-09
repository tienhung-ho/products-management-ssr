const productRouter = require('./product.route.js')
const homeRouter = require('./home.route.js')


// middleware

const categoriesMiddlewares = require('../../middlewares/client/categories.middlewares.js')

module.exports = (app) => {
    app.use('/product', 
      categoriesMiddlewares.category,
      productRouter)
    app.use('/', 
      categoriesMiddlewares.category,
      homeRouter)
}
