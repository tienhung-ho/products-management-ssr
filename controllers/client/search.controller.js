const systemConfig = require('../../config/system/index')
const Product = require('../../models/product.model.js')

// helper
const productHelpers = require('../../helpers/products.js')

// [GET] /
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;

  const keywordRegex =  new RegExp(keyword, 'i')

  let newProducts= []

  if (keyword) {
    const products = await Product.find({
      title: keywordRegex,
    })

    newProducts = productHelpers.newPriceProducts(products)

  }
  
  res.render(`${systemConfig.prefixClient}/pages/search/index.pug`, {
    titlePage: 'Kết quả tìm kiếm',
    keyword,
    products: newProducts
  })
  
}
