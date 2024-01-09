const productCategoriesModel = require('../../models/product.category.model') 

// helper

const createTree = require('../../helpers/create-tree.js')

// [GET] /
module.exports.index = async (req, res) => {
    res.render('client/pages/home/index.pug', {
        titlePage: 'Trang chu',
    })
}
