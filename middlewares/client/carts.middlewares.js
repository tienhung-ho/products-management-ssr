const CartModel = require('../../models/cart.model')


module.exports.cartId = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = new CartModel()
    await cart.save()
    let maxAge = 200 * 24 * 60 * 60 * 1000

    res.cookie('cartId', cart.id, { maxAge: maxAge })
    console.log(123);
  }
  else {

    const cart = await CartModel.findOne({
      _id: req.cookies.cartId
    })

    cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0)

    res.locals.miniCart = cart

  }


  next()
}
