const Product = require('../../models/product.model.js')
const accountsModel = require('../../models/accounts.model')

const systemConfig = require('../../config/system/index')
const filterStatusHelper = require('../../helpers/filterStatus.js')
const searchHelper = require('../../helpers/search.js')
const paginationHelper = require('../../helpers/pagination.js')

// [GET] /admin/product
module.exports.index = async (req, res) => {

  const find = {
    deleted: false
  }

  // filter status
  const filterStatus = filterStatusHelper(req.query)
  if (req.query.status) {
    find.status = req.query.status
  }

  // search
  const searchObject = searchHelper(req.query)
  if (req.query.keyword) {
    find.title = searchObject.regex
  }


  // pagination
  let initPagination = {
    currentPage: 1,
    limit: 4
  }
  initPagination.totalProduct = await Product.count(find)
  const paginationObject = paginationHelper(req.query, initPagination)

  // sort
  let sort = {}

  sort.position = 'desc'

  if (req.query.sortKey && req.query.sortValue) {
    delete sort.position;
    sort[req.query.sortKey] = req.query.sortValue
  }


  const products = await Product.find(find)
    .sort({ ...sort })
    .limit(paginationObject.limit)
    .skip(paginationObject.skip)

  for (let item of products) {
    // Get user was create product
    const userCreation = await accountsModel.findOne({
      _id: item.createdBy.account_id
    })

    if (userCreation) {
      item.createdBy.account_name = userCreation.fullName
    }

    // Get user was create product
    if (item.updatedBy.slice(-1).length > 0) {
      
      const userUpdation = await accountsModel.findOne({
        _id: item.updatedBy.slice(-1)[0].account_id
      })
  
      if (userUpdation) {
        item.updatedBy.account_name = userUpdation.fullName
      }
    }
  }

  

  res.render(`${systemConfig.prefixAdmin}/pages/product/index.pug`, {
    titlePage: 'Product',
    products,
    filterStatus,
    keyword: searchObject.keyword,
    paginationObject
  })
}

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const permissions = res.locals.role.permissions

    if (permissions.includes('products__edit')) {
      const { status, id } = req.params
      const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
      }
      await Product.updateOne({ _id: id }, { status: status,
        $push: { updatedBy: updatedBy } 
      })

      req.flash('changeSuccess', 'Trang thái đã được thay đổi thành công!')

      res.redirect('back')
    }
    else {
      return
    }

  }
  catch (err) {
    req.flash('changeError', 'Trang thái thay đổi KHÔNG thành công!')
  }
}

// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const permissions = res.locals.role.permissions

    if (permissions.includes('products__edit')) {

      const { type, ids } = req.body
      const idsChange = ids.split(', ')

      const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
      }

      switch (type) {
        case 'active':
        case 'inactive':
          await Product.updateMany({ _id: { $in: idsChange } }, { status: type,
            $push: { updatedBy: updatedBy }
          })
          req.flash('changeSuccess', `Đã thay đổi trang thái ${idsChange.length} sản phẩm thành công`)
          break
        case 'delete-all':
          await Product.updateMany({ _id: { $in: idsChange } }, {
            deleted: true,
            deletedBy: {
              account_id: res.locals.user.id,
              deletedAt: new Date()
            }
          })
          req.flash('changeSuccess', `Đã xoá ${idsChange.length} sản phẩm thành công`)
          break
        case 'change-position':
          for (const item of idsChange) {
            const [id, position] = item.split('-')
            await Product.updateOne({ _id: id }, { position: position,
              $push: { updatedBy: updatedBy }
            })
          }
          req.flash('changeSuccess', `Đã thay đổi vị trí của ${idsChange.length} sản phẩm thành công`)
          break
        default:
          break
      }
      res.redirect('back')
    }
    else {
      return
    }
  }
  catch (err) {
    req.flash('changeError', `Thay đổi vị trí của ${idsChange.length} sản phẩm KHÔNG thành công`)
  }



}

// [DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const permissions = res.locals.role.permissions

    if (permissions.includes('products__delete')) {
      const id = req.params.id
      console.log(res.locals.user.id);
    
      await Product.updateOne(
        { _id: id },
        { deleted: true, 
          deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date()
          }
        }
      )

    
      req.flash('changeSuccess', 'Sản phẩm đã được xoá thành công!')
    
      res.redirect('back')
    }
    else {
      return
    }

  }
  catch(err) {
    req.flash('changeError', 'Sản phẩm xoá KHÔNG thành công!')
  }
}

// [GET] /admin/product/create
module.exports.create = async (req, res) => {
  const permissions = res.locals.role.permissions

  // if (permissions.includes('products__create')) {
    res.render(`${systemConfig.prefixAdmin}/pages/product/create.pug`, {
      titlePage: 'Create product',
    })

  // }
}

// [POST] /admin/product/create
module.exports.createPost = async (req, res) => {
  try {
    const permissions = res.locals.role.permissions

    if (permissions.includes('products__create')) {

      req.body.price = parseInt(req.body.price)
      req.body.discountPercentage = parseFloat(req.body.discountPercentage)
      req.body.stock = parseInt(req.body.stock)
      req.body.createdBy = {
        account_id: res.locals.user.id
      }
      if (req.body.position !== '') {
        req.body.position = parseInt(req.body.position)
      }
      else {
        req.body.position = await Product.count() + 1
      }

      const product = await Product.create(req.body)
    
      res.redirect(`/${systemConfig.prefixAdmin}/product`)
    }
    else {
      return
    }
  }
  catch(err) {
    console.log(err);
  }
}

// [GET] /admin/product/edit/:id

module.exports.edit = async (req, res) => {

  try {
    // const permissions = res.locals.role.permissions

    // if (permissions.includes('products__edit')) {
      const product = await Product.findById({ _id: req.params.id })
  
      res.render(`${systemConfig.prefixAdmin}/pages/product/edit.pug`, {
        titlePage: 'Edit product',
        product
      })
    // }
    // else {
    //   return
    // }
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/product`)
  }

}

// [PATCH] /admin/product/edit/:id

module.exports.editPatch = async (req, res) => {
  try {
    // const permissions = res.locals.role.permissions

    // if (permissions.includes('products__edit')) {

      req.body.price = parseInt(req.body.price)
      req.body.discountPercentage = parseFloat(req.body.discountPercentage)
      req.body.stock = parseInt(req.body.stock)
    
      const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
      }

      if (req.body.position !== '') {
        req.body.position = parseInt(req.body.position)
      }
      else {
        req.body.position = await Product.count() + 1
      }
    
      await Product.findOneAndUpdate(
        { _id: req.params.id }, 
        {
          ...req.body,
          $push: { updatedBy: updatedBy }
        }
      )
    
      req.flash('changeSuccess', 'Đã cập nhật thông tin sản phẩm thành công!')
    
      res.redirect(`/${systemConfig.prefixAdmin}/product`)
    // }
    // else {
    //   return
    // }
  }
  catch(err) {

  }
}

// [GET] /admin/product/details/:id

module.exports.details = async (req, res) => {

  try {
    const product = await Product.findById({ _id: req.params.id })

    res.render(`${systemConfig.prefixAdmin}/pages/product/details.pug`, {
      titlePage: 'Product Deltails',
      product
    })
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/product`)
  }
}


