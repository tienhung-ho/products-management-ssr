
const ChatModel = require('../../models/chat.model')
const UserModel  = require('../../models/users.model')
const uploadToCloud = require('../../helpers/uploadToCloud')

// chat socketIO
const chatSocket = require('../../sockets/client/chat.sockets')

// [GET] /chat/:roomId
module.exports.index = async (req, res) => {

  const roomChatId = req.params.roomId

  // socketIO
  chatSocket(res, req)
  // END socketIO

  const chats = await ChatModel.find({
    deleted: false,
    room_chat_id: roomChatId
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
