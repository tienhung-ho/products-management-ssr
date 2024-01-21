const productRouter = require('./product.route.js')
const homeRouter = require('./home.route.js')
const searchRouter = require('./search.route.js')
const cartRouter = require('./cart.route.js')
const checkoutRoute = require('./checkout.route.js')
const userRoute = require('./user.route.js')
const chatModel = require('./chat.route.js')
const usersRoute = require('./users.route.js')


// middleware
const cartsMiddlewares = require('../../middlewares/client/carts.middlewares.js')
const categoriesMiddlewares = require('../../middlewares/client/categories.middlewares.js')
const userMiddlewares = require('../../middlewares/client/user.middelwares.js')
const settingMiddlewares = require('../../middlewares/client/setting.middlewares.js')
const authMiddelwares = require('../../middlewares/client/authorize.js')


module.exports = (app) => {
    
  app.use(categoriesMiddlewares.category)

  app.use(cartsMiddlewares.cartId)

  app.use(userMiddlewares.inforUser)

  app.use(settingMiddlewares.settingGeneral)

  app.use('/chat', authMiddelwares.requireAuthorize, chatModel)

  app.use('/users', authMiddelwares.requireAuthorize, usersRoute)

  app.use('/user', userRoute)

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

