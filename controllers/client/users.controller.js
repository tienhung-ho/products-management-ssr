const systemConfig = require('../../config/system/index')
const usersModel = require('../../models/users.model')
const saltRounds = Number(process.env.SALTROUNDS)

// hash
const bcrypt = require('bcrypt');

// [GET] /user/register
module.exports.register = async (req, res) => {

  res.render(`${systemConfig.prefixClient}/pages/user/register.pug`, {
    titlePage: 'Đăng ký',
  })
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const user = req.body

  const exitEmail = await usersModel.findOne({
    email: user.email,
    deleted: false
  })

  if (exitEmail) {
    req.flash('changeError', "Tài khoản đã tồn tại!")
    res.redirect('back')
    return
  }

  const plainTextPassword = req.body.password;
  req.body.password = await bcrypt.hash(plainTextPassword, saltRounds);
  
  req.flash('changeSuccess', "Tạo tài khoảng thành công!")
  await usersModel.create(req.body)
  
  res.cookie("tokenUser", user.tokenUser)

  res.redirect(`/product`)

}

