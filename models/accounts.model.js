const mongoose = require('mongoose')
const Schema = mongoose.Schema
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const genarate = require('../helpers/genarate.js')

const accountSchema = new Schema({
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: genarate.genarateRanString(40)
    },
    phone: String,
    avatar: String,
    status: {
      type: String,
      default: 'active'
    },
    role_id: String,
    
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, { timestamps: true })

const Account = mongoose.model('acounts', accountSchema)

module.exports = Account
