const systemConfig = require('../../config/system/index')
const usersModel = require('../../models/users.model')
const saltRounds = Number(process.env.SALTROUNDS)

// hash
const bcrypt = require('bcrypt');
const { use } = require('../../routes/client/users.route');

// [GET] /user/register
module.exports.register = async (req, res) => {

  res.render(`${systemConfig.prefixClient}/pages/user/register.pug`, {
    titlePage: 'Đăng ký',
  })
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {

  const exitEmail = await usersModel.findOne({
    email: req.body.email,
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
  const user = new usersModel(req.body)
  await user.save()

  res.cookie("tokenUser", user.tokenUser)

  res.redirect(`/product`)

}


// [GET] /user/login
module.exports.login = async (req, res) => {

  res.render(`${systemConfig.prefixClient}/pages/user/login.pug`, {
    titlePage: 'Đăng ký',
  })
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await usersModel.findOne({
    email: email,
    deleted: false
  })

  if (!user) {
    req.flash('changeError', "Tài khoản không tồn tại!")
    res.redirect('back')
    return
  }

  if (user.status == 'inactive') {
    req.flash('changeError', "Tài khoản đã bị khóa!")
    return
  }


  const hashedPasswordFromDatabase = user.password;
  const isMatch = bcrypt.compareSync(password, hashedPasswordFromDatabase);


  if (isMatch) {
    res.cookie("tokenUser", user.tokenUser)

    req.flash('changeSuccess', "Đăng nhập khoảng thành công!")

    res.redirect(`/product`)
  }

}
