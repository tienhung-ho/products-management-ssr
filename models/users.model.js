const mongoose = require('mongoose')
const generate = require('../helpers/genarate');

const usersSchema = new mongoose.Schema(
{
  fullName: String, 
  email: String,
  password: String,
  tokenUser: {
    type: String,
    default: generate.genarateRanString(30)
  },
  phone: String,
  avatar: String,
  friendList: [
    {
      user_id: String,
      room_chat_id: String,
    }
  ],
  acceptFriends: Array,
  requestFriends: Array,
  onlineStatus: String,
  status: {
    type: String,
    default: 'active'
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
},
{ timestamps: true })

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
