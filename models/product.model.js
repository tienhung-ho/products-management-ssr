const mongoose = require('mongoose')
const Schema = mongoose.Schema
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
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
    deletedBy: {
      account_id: String,
      deletedAt: {
        type: Date,
      }
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    },
    updatedBy: [
      {
      account_id: String,
      updatedAt: Date
      }
    ],
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

module.exports = Product
