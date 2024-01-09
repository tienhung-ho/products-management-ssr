
const productCategoriesModel = require('../../models/product.category.model') 

// helper

const createTree = require('../../helpers/create-tree.js')


module.exports.category = async (req, res, next) => {
  const categories = await productCategoriesModel.find({
    
  })
  res.locals.layoutProductsCategories = createTree(categories)
  next()
}
