
const RoomChatModel = require('../../models/room-chat.model')
const UserModel  = require('../../models/users.model')


// [GET] /rooms-chat
module.exports.index = async (req, res) => {

  const roomsChat = await RoomChatModel.find({
    typeRoom: 'group'
  })

  res.render('client/pages/rooms-chat', {
    titlePage: 'Phòng chat',
    roomsChat
  })
}


// [GET] /rooms-chat/create
module.exports.create = async (req, res) => {

  const friendList = res.locals.user.friendList

  for (const user of friendList) {
    const infoUser = await UserModel.findOne({
      _id: user.user_id
    }).select('fullName avatar')

    user.friendInfo = infoUser
  }

  res.render('client/pages/rooms-chat/create', {
    titlePage: 'Phòng chat',
    friendList

  })
}

// [POST] /rooms-chat/create
module.exports.createPost = async (req, res) => {
  
  const title = req.body.title
  const usersId = req.body.usersId

  const data = {
    title: title,
    typeRoom: 'group',
    users: [
    ],
  }

  usersId.forEach(userId => {
    data.users.push({
      user_id: userId,
      role: 'user',
    })
  });

  data.users.push({
    user_id: res.locals.user.id,
    role: 'admin',
  })
  
  const roomChat = new RoomChatModel(data)

  await roomChat.save()

  res.redirect(`/chat/${roomChat.id}`)
}

