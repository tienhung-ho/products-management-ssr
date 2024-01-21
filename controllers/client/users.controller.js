
const systemConfig = require('../../config/system/index')
const userModel = require('../../models/users.model')

// socket

const usersSocket = require('../../sockets/client/users.sockets')

// [GET] /users/not-friend
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
    titlePage: 'Danh sách người dùng',
    users
  })
}


// [GET] /users/request
module.exports.request = async (req, res) => {
  const userId = res.locals.user.id

  
  // SOCKET

  usersSocket(res)

  //  END SOCKET

  const myUser = await userModel.findOne({
    _id: userId,
    deleted: false,
    status: 'active'
  })

  const requestFriends = myUser.requestFriends

  const users = await userModel.find({
    _id: { $in: requestFriends },
    status: 'active',
    deleted: false
  }).select('avarta fullName')

  res.render(`${systemConfig.prefixClient}/pages/users/request.pug`, {
    titlePage: 'Danh sách yêu cầu đã gửi',
    users
  })
}


// [GET] /users/accept
module.exports.accept = async (req, res) => {
  const userId = res.locals.user.id

  
  // SOCKET

  usersSocket(res)

  //  END SOCKET

  const myUser = await userModel.findOne({
    _id: userId,
    deleted: false,
    status: 'active'
  })

  const acceptFriends = myUser.acceptFriends

  const users = await userModel.find({
    _id: { $in: acceptFriends },
    status: 'active',
    deleted: false
  }).select('avarta fullName')

  res.render(`${systemConfig.prefixClient}/pages/users/accept.pug`, {
    titlePage: 'Danh sách yêu cầu kết bạn',
    users
  })
}

