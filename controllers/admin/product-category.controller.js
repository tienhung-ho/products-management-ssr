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
