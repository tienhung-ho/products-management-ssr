const CartModel = require('../../models/cart.model')
const Product = require('../../models/product.model.js')
const systemConfig = require('../../config/system/index')
const ProductCategory = require('../../models/product.category.model.js')
const OrderModel = require('../../models/order.model.js')

// helper

const productHelper = require('../../helpers/products.js')
const formatPriceHelper = require('../../helpers/format-price.js')

// [GET] /checkout/
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


  res.render(`${systemConfig.prefixClient}/pages/checkout`, {
    titlePage: 'Giỏ hàng',
    cart
  })
}

module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId
  const userInfo = req.body
  
  const cart = await CartModel.findOne({
    _id: cartId
  })

  const products = []

  for (let item of cart.products) {
    const objProduct = {
      product_id: item.product_id,
      quantity: item.quantity,
      price: 0,
      discountPercentage: 0

    }

    const product = await Product.findOne({
      _id: item.product_id
    })

    objProduct.price = product.price
    objProduct.discountPercentage = product.discountPercentage
  }

  const objOrder = {
    // user_id: String
    cart_id: cartId,
    userInfo: userInfo,
    products: products
  }

  console.log(objOrder);

  const order = await OrderModel.create(objOrder)

  await CartModel.findOne({
    _id: cartId
  }, {
    products: []
  }
  )
  res.redirect(`/checkout/success/${order.id}`)
}

