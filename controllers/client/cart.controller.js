const CartModel = require('../../models/cart.model')
const Product = require('../../models/product.model.js')

module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId

  const productId = req.params.id
  const quantity = parseInt(req.body.quantity)

  const cart = await CartModel.findOne({
    _id: cartId
  }) 

  const exitItem = cart.products.find(item => item.product_id == productId)

  if (exitItem) {

    const newQuantity = quantity + exitItem.quantity

    await CartModel.updateOne({
      _id: cartId,
      'products.product_id': productId
      },
      {
        $set: {
          'products.$.quantity': newQuantity
        }
      }
    )

    req.flash('changeSuccess', "Thêm sản phẩm vào giỏ hàng thành công!")
  
    res.redirect('back')


  }
  else {

    const product = {
      product_id: productId,
      quantity: quantity
    }
  
  
    const cart = await CartModel.findOneAndUpdate(
      {
        _id: cartId
      },
      {
        $push: { products: product }
      }
  
    )
  
    req.flash('changeSuccess', "Thêm sản phẩm vào giỏ hàng thành công!")
  
    res.redirect('back')
  }

}
