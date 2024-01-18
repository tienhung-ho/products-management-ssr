
const ChatModel = require('../../models/chat.model')
const UserModel  = require('../../models/users.model')
const { use } = require('../../routes/client/product.route')

// [GET] /chat
module.exports.index = async (req, res) => {
  
  const userId = res.locals.user.id


  _io.once('connection', (socket) => {

    socket.on('CLIENT_SEND_MESSAGE', async (content) => {
      const chat = new ChatModel({
        user_id: userId,
        content
      })

      await chat.save()

    })

    console.log('a user connected', socket.id);
  })

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
