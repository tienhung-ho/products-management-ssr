const productCategoriesModel = require('../../models/product.category.model') 
const Product = require('../../models/product.model.js')

// helper
const productHelper = require('../../helpers/products.js')

// [GET] /
module.exports.index = async (req, res) => {
    const productsFeatured = await Product.find({
      featured: "1",
      deleted: false,
      status: 'active'
    }).limit(6)

    const newProductsFeatured = productHelper.newPriceProducts(productsFeatured)
    res.render('client/pages/home/index.pug', {
        titlePage: 'Trang chu',
        products: productsFeatured
    })
}
