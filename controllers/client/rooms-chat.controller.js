
const ChatModel = require('../../models/chat.model')
const UserModel  = require('../../models/users.model')
const uploadToCloud = require('../../helpers/uploadToCloud')

// chat socketIO
const chatSocket = require('../../sockets/client/chat.sockets')

// [GET] /rooms-chat
module.exports.index = async (req, res) => {

  res.render('client/pages/rooms-chat', {
    titlePage: 'Phòng chat',

  })
}
