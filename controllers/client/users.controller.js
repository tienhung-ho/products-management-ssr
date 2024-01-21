
const systemConfig = require('../../config/system/index')
const userModel = require('../../models/users.model')

// [GET] /users/notFriend
module.exports.notFriend = async (req, res) => {
  
  const userId = res.locals.user.id

  const users = await userModel.find({
    _id: { $ne: userId },
    status: 'active',
    deleted: false
  }).select('avarta fullName')

  res.render(`${systemConfig.prefixClient}/pages/users/not-friend.pug`, {
    titlePage: 'Đăng ký',
    users
  })
}
