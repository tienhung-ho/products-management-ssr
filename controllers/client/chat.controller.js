
const ChatModel = require('../../models/chat.model')
const UserModel  = require('../../models/users.model')
const uploadToCloud = require('../../helpers/uploadToCloud')

// chat socketIO
const chatSocket = require('../../sockets/client/chat.sockets')

// [GET] /chat
module.exports.index = async (req, res) => {
  
  // socketIO
  chatSocket(res)
  // END socketIO

  const chats = await ChatModel.find({
    deleted: false
  })

  for (const chat of chats) {
    const userInfo = await UserModel.findOne({
      _id: chat.user_id
    }).select('fullName')

    chat.userInfo = userInfo;
  }

  res.render('client/pages/chat', {
    titlePage: 'Chat',
    chats,

  })
}
