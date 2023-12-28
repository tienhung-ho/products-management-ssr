const Product = require('../../models/product.model.js')

// [GET] /product
module.exports.index = async (req, res) => {

    const filter = {
        status: "active",
        deleted: false
    }
    const products = await Product.find(filter)
                                .sort({ position: 'desc' })

    const newProduct = products.map(item => {
        item.newPrice = (item.price * (100 -  item.discountPercentage) / 100).toFixed()
        
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
    
    
        product.newPrice = (product.price * (100 -  product.discountPercentage) / 100).toFixed()
            
    
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