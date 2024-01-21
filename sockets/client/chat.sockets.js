
const ChatModel = require('../../models/chat.model')
const UserModel = require('../../models/users.model')
const uploadToCloud = require('../../helpers/uploadToCloud')


module.exports = async (res) => {

  try {

    const userId = res.locals.user.id
    const fullName = res.locals.user.fullName

    _io.once('connection', (socket) => {

      socket.on('CLIENT_SEND_MESSAGE', async (data) => {

        let images = []

        for (const imgBuffer of data.images) {
          const link = await uploadToCloud(imgBuffer)
          images.push(link)
        }

        const chat = new ChatModel({
          user_id: userId,
          content: data.content,
          images


        })

        await chat.save()


        _io.emit("SERVER_RETURN_MESSAGE", {
          userId,
          fullName,
          data,
          content: data.content,
          images
        })

      })

      socket.on('CLIENT_SEND_TYPING', (type) => {

        socket.broadcast.emit("SERVER_RETURN_TYPING", {
          userId,
          fullName,
          type
        })

      })

      console.log('a user connected', socket.id);

    })
  }
  catch (err) {
    console.log(err);
  }
}
