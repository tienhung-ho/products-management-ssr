
const UserModel = require('../../models/users.model')
const RoomChatModel = require('../../models/room-chat.model')


module.exports.isAccept = async (req, res, next) => {
  const userId = res.locals.user.id
  const roomChatId = req.params.roomId
  try {
    const isAcceptRoom = await RoomChatModel.findOne({
      _id: roomChatId,
      "users.user_id": userId,
      deleted: false,
    })
  
    if (isAcceptRoom) {
      next()
    }
    else {
      res.redirect('/')
    }

  }
  catch(err) {
    res.redirect('/')
  }

}

