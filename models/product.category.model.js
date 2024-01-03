const mongoose = require('mongoose')
const Schema = mongoose.Schema
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productCategorySchema = new Schema({
    title: String,
    description: String,
    parent_id: {
        type: String,
        default: ''
    },
    thumbnail: String,
    status: String,
    position: Number,
    slug: {
        type: String,
        slug: "title",
        unique: true,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true })

const ProductCategory = mongoose.model('product-category', productCategorySchema)

module.exports = ProductCategory
