
const systemConfig = require('../../config/system/index')
const userModel = require('../../models/users.model')

// socket

const usersSocket = require('../../sockets/client/users.sockets')

// [GET] /users/notFriend
module.exports.notFriend = async (req, res) => {
  
  const userId = res.locals.user.id

  const myUser = await userModel.findOne({
    _id: userId,
    deleted: false,
    status: 'active'
  })

  const requestFriends = myUser.requestFriends
  const acceptFriends = myUser.acceptFriends


  const users = await userModel.find({
    $and: [
     { _id: { $ne: userId } },
     { _id: { $nin: requestFriends } },
     { _id: { $nin: acceptFriends } },

    ],
    status: 'active',
    deleted: false
  }).select('avarta fullName')


  // SOCKET

  usersSocket(res)

  //  END SOCKET


  res.render(`${systemConfig.prefixClient}/pages/users/not-friend.pug`, {
    titlePage: 'Đăng ký',
    users
  })
}
