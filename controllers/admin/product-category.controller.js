const ProductCategory = require('../../models/product.category.model.js')

const systemConfig = require('../../config/system/index')

const createTreeHelper = require('../../helpers/create-tree.js')

// [GET] /admin/product-category
module.exports.index = async (req, res) => {

    const find = {
        deleted: false
    }

    const records = await ProductCategory.find(find)
    const tree = createTreeHelper(Array.from(records))

    res.render(`${systemConfig.prefixAdmin}/pages/product-category/index.pug`, {
        titlePage: 'Danh mục sản phẩm',
        records: tree
    })
}

// [GET] /admin/product-category/create
module.exports.create = async (req, res) => {
    const find = {
        deleted: false
    }

    const records = await ProductCategory.find(find)

    const tree = createTreeHelper(Array.from(records))

    res.render(`${systemConfig.prefixAdmin}/pages/product-category/create.pug`, {
        titlePage: 'Thêm danh mục sản phẩm',
        records: tree
    })
}

// [POST] /admin/product-category/create
module.exports.createPost = async (req, res) => {
    try {


        if (req.body.position !== '') {
            req.body.position = parseInt(req.body.position)
        }
        else {
            req.body.position = await ProductCategory.count() + 1
        }

        const poruct = await ProductCategory.create(req.body)
        await poruct.save()

        res.redirect(`/${systemConfig.prefixAdmin}/product-category`)

    }
    catch (err) {
        console.log(err);
    }

}

// [GET] /admin/product-category/edit/:id
module.exports.edit = async (req, res) => {

  const id = req.params.id 

  req.body.position = parseInt(req.body.position)
  
  const data = await ProductCategory.findOne({
    _id: id
  })

  const record = await ProductCategory.find({
    deleted: false
  })

  const newRecord = createTreeHelper(record)

  res.render(`${systemConfig.prefixAdmin}/pages/product-category/edit.pug`, {
    titlePage: 'Chỉnh sửa',
    data,
    newRecord
})
}

// [PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async (req, res) => {
  try {

    const id = req.params.id

    const record = await ProductCategory.findOneAndUpdate({
      _id: id
    },
      req.body
    )
    await record.save()

    res.redirect(`/${systemConfig.prefixAdmin}/product-category`)

  }
  catch (err) {
      console.log(err);
  }

}
