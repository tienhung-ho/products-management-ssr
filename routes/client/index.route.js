const productRouter = require('./product.route.js')
const homeRouter = require('./home.route.js')
const searchRouter = require('./search.route.js')
const cartRouter = require('./cart.route.js')
const checkoutRoute = require('./checkout.route.js')


// middleware
const cartsMiddlewares = require('../../middlewares/client/carts.middlewares.js')
const categoriesMiddlewares = require('../../middlewares/client/categories.middlewares.js')

module.exports = (app) => {
    
  app.use(categoriesMiddlewares.category)

  app.use(cartsMiddlewares.cartId)

  app.use('/cart', cartRouter)

  app.use('/search', 
  searchRouter)

  app.use('/product', 
    productRouter)

  app.use('/checkout', 
    checkoutRoute
  )
    
  app.use('/', 
    homeRouter)

}

