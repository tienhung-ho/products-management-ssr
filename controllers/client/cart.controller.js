const CartModel = require('../../models/cart.model')
const Product = require('../../models/product.model.js')
const systemConfig = require('../../config/system/index')
const ProductCategory = require('../../models/product.category.model.js')

// helper

const productHelper = require('../../helpers/products.js')
const formatPriceHelper = require('../../helpers/format-price.js')


// [GET] /cart/
module.exports.index = async (req, res) => {
  const cartId = res.locals.miniCart

  const cart = await CartModel.findOne({
    _id: cartId
  })

  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const product = await Product.findOne({
        _id: item.product_id
      })

      if (product.product_category_id) {
        const category = await ProductCategory.findOne({
          _id: product.product_category_id
        })
        item.category = category.title
      }
      item.product = product
      item.product.newPrice = productHelper.newPriceProduct(product)
      item.product.totalPrice = formatPriceHelper.formatNumberWithCommas(item.product.newPrice * item.quantity)
    }

    cart.totalPrice = formatPriceHelper.formatNumberWithCommas(cart.products.reduce((sum, item) => sum + item.quantity * item.product.newPrice, 0))
  }


  res.render(`${systemConfig.prefixClient}/pages/cart/index.pug`, {
    titlePage: 'Giỏ hàng',
    cart
  })
}

// [POST] /cart/add/:cartID
module.exports.add = async (req, res) => {
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

// [GET] /cart/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const cartId = req.cookies.cartId
    
    await CartModel.updateOne({ _id: cartId }, {
      $pull: {
        products: {
          _id: id
        }
      }
    })

    req.flash("changeSuccess", "Xóa sản phẩm khỏi giỏ hành thành công!")
    res.redirect('back')

  }
  catch (err) {
    console.log(err);
    req.flash("changeError", "Lost conect to sever")
  }

}

// [GET] /cart/update/:id/:value
module.exports.updateQuantity = async (req, res) => {
  try {
    const id = req.params.id
    const quantity = req.params.quantity

    const cartId = req.cookies.cartId

    await CartModel.updateOne(
      { _id: cartId, 'products.product_id': id },
      {
        $set: {
          'products.$.quantity': quantity
        }
      }
    )
    req.flash('changeSuccess', "Thay đổi số lượng thành công!")
    res.redirect('back')
  }
  catch(err) {
    console.log(err);
    req.flash("changeError", "Lost conect to sever")
  }
  
  

}
