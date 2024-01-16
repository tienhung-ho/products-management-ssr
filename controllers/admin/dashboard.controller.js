const Product = require('../../models/product.model.js')
const accountsModel = require('../../models/accounts.model')
const ProductCategory = require('../../models/product.category.model.js')
const usersModel = require('../../models/users.model')


module.exports.index = async (req, res) => {
  const statistics = {
    productCategories: {
      total: 0,
      active: 0,
      inactive: 0
    },
    products: {
      total: 0,
      active: 0,
      inactive: 0
    },
    adminAccounts: {
      total: 0,
      active: 0,
      inactive: 0
    },
    clientAccounts: {
      total: 0,
      active: 0,
      inactive: 0
    },
  }

  const account = await accountsModel.findOne({
    token: req.cookies.token
  })

  statistics.productCategories.total = await ProductCategory.count({
    deleted: false
  })

  statistics.productCategories.active = await ProductCategory.count({
    deleted: false,
    status: 'active'
  })

  statistics.productCategories.inactive = await ProductCategory.count({
    deleted: false,
    status: 'inactive'
  })


  statistics.products.total = await Product.count({
    deleted: false
  })

  statistics.products.active = await Product.count({
    deleted: false,
    status: 'active'
  })

  statistics.products.inactive = await Product.count({
    deleted: false,
    status: 'inactive'
  })



  statistics.adminAccounts.total = await accountsModel.count({
    deleted: false
  })

  statistics.adminAccounts.active = await accountsModel.count({
    deleted: false,
    status: 'active'
  })

  statistics.adminAccounts.inactive = await accountsModel.count({
    deleted: false,
    status: 'inactive'
  })


  statistics.clientAccounts.total = await usersModel.count({
    deleted: false
  })

  statistics.clientAccounts.active = await usersModel.count({
    deleted: false,
    status: 'active'
  })

  statistics.clientAccounts.inactive = await usersModel.count({
    deleted: false,
    status: 'inactive'
  })
  

    res.render('admin/pages/dashboard/index.pug', {
        titlePage: 'Dashboard',
        statistics,
        user: account
    })
}
