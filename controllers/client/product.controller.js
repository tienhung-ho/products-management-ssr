const Product = require('../../models/product.model.js')
const ProductCategory = require('../../models/product.category.model.js')

// [GET] /product
module.exports.index = async (req, res) => {

  const filter = {
    status: "active",
    deleted: false
  }
  const products = await Product.find(filter)
    .sort({ position: 'desc' })

  const newProduct = products.map(item => {
    item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed()

    return item
  })

  res.render('client/pages/product/index.pug', {
    titlePage: 'Product',
    products: newProduct
  })
}

// [GET] /product/details/:slug
module.exports.details = async (req, res) => {

  try {
    const filter = {
      slug: req.params.slug,
      status: "active",
      deleted: false
    }
    const product = await Product.findOne(filter)

    await Product.findOneAndUpdate(slug, {
      $inc: { views: 1 }
    })

    product.newPrice = (product.price * (100 - product.discountPercentage) / 100).toFixed()


    res.render('client/pages/product/details.pug', {
      titlePage: 'Product',
      product
    })

  } catch (error) {
    res.redirect('/product')
  }
}

module.exports.add = (req, res) => {
  res.send('Add product')
}


// [GET] /product/category
module.exports.category = async (req, res) => {
  try {

    const category = await ProductCategory.findOne({
      deleted: false,
      status: 'active',
      slug: req.params.slugCategory
    })

    const getSubCategories = async (parentId) => {
      const subs = await ProductCategory.find({
        deleted: false,
        status: 'active',
        parent_id: parentId
      })

      let allSub = [...subs];

      for (let sub of subs) {
        const childs = await getSubCategories(sub.id)
        allSub = allSub.concat(childs)
      }

      return allSub
    }

    const listCategories = getSubCategories(category.id)

    const idListCategories = (await listCategories).map(item => item.id)
    console.log(idListCategories);
  
    const filter = {
      status: "active",
      deleted: false,
      product_category_id: { $in:  [category.id, ...idListCategories]}
    }
  
    const products = await Product.find(filter
      
      )
      .sort({ position: 'desc' })
  
  
    const newProduct = products.map(item => {
      item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed()
  
      return item
    })
  
    res.render('client/pages/product/index.pug', {
      titlePage: category.title,
      products: newProduct
    })
  }
  catch(err) {
    console.log(err);
  }
}
