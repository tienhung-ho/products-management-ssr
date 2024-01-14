const systemConfig = require('../../config/system/index')
const usersModel = require('../../models/users.model')


module.exports.inforUser = async (req, res, next) => {
  
  if (req.cookies.tokenUser) {
    const user = await usersModel.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false
    }).select('-password')

    res.locals.user = user
  }
  
  
  next()
}
