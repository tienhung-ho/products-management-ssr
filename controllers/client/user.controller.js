const systemConfig = require('../../config/system/index')
const usersModel = require('../../models/users.model')
const forgotPassword = require('../../models/forgot-password.model')
const cartModel = require('../../models/cart.model')

const saltRounds = Number(process.env.SALTROUNDS)

// hash
const bcrypt = require('bcrypt');

// helper
const genarate = require('../../helpers/genarate')
const sendMail = require('../../helpers/send-mail')

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
  const tokenUser = genarate.generateRandomString(30)
  req.body.tokenUser = tokenUser
  const user = await usersModel.create(req.body)
  console.log(user.tokenUser);

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
    let maxAge = 60 * 60 * 1000  

    await cartModel.updateOne({
      _id: req.cookies.cartId  
    }, {
      user_id: user.id
    })

    res.cookie("tokenUser", user.tokenUser, { maxAge:  maxAge})

    await usersModel.updateOne({
      _id: user.id
    },
      {
        onlineStatus: 'online'
      }
    )

    _io.once('connection', (socket) => {

      // Gửi trạng thái đến những người khác
      socket.broadcast.emit('SERVER_RETURN_USER_STATUS_ONLINE', user.id)

    })

    req.flash('changeSuccess', "Đăng nhập khoảng thành công!")

    res.redirect(`/product`)
  }
  else {
    req.flash('changeError', "Đăng nhập thất bại!")
    res.redirect('back')
  }

}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
  await usersModel.updateOne({
    _id: res.locals.user.id
  },
    {
      onlineStatus: 'offline'
    }
  )

  _io.once('connection', (socket) => {

    // Gửi trạng thái đến những người khác
    socket.broadcast.emit('SERVER_RETURN_USER_STATUS_OFFLINE', res.locals.user.id)

  })

  res.clearCookie('tokenUser')
  res.redirect('/')
}

// [GET] /user/password/forgotPassWord
module.exports.forgotPassWord = async (req, res) => {

  res.render(`${systemConfig.prefixClient}/pages/user/forgot-password.pug`, {
    titlePage: 'Quên mật khẩu',
  })

}

// [POST] /user/password/forgotPassWord
module.exports.forgotPassWordPost = async (req, res) => {
  const email = req.body.email
  
  const user = await usersModel.findOne({
    email: email,
    deleted: false
  })

  if (!user) {
    req.flash('changeError', "Email không tồn tại")
    res.redirect('back')
    return
  }

  const otp = genarate.genarateRanNumber(6)

  const objectFPW = {
    email: email,
    otp: otp,
    expireAt: Date.now()
  }

  const forgotPass = new forgotPassword(objectFPW)
  forgotPass.save()

  
  
  // SEND EMAIL
  const sub = "Mã OTP CỦA BẠN!"
  const html = `Mã OTP xác minh là <b>${otp}</b> sẽ hết hạn sau 3p`

  sendMail.sendMail(email, sub, html)
// END SEND EMAIL
  res.redirect(`/user/password/otp?email=${email}`)

}

// [GET] /user/password/otp?email
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email
  


  res.render(`${systemConfig.prefixClient}/pages/user/otp-password.pug`, {
    titlePage: 'OTP',
    email
  })
}


// [POST] /user/password/otp?email
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email
  const otp = req.body.otp
  
  const result = await forgotPassword.findOne({
    email: email,
    otp: otp
  })

  if (!result) {
    req.flash('changeErorr', "Lỗi, OTP không hợp lệ")
    res.redirect('back')
    return
  }

  const user = await usersModel.findOne({
    email: email
  })

  res.cookie('tokenUser', user.tokenUser)

  res.redirect('/user/password/reset')
}

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render(`${systemConfig.prefixClient}/pages/user/reset-password.pug`, {
    titlePage: 'Reset',
  })
}


// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  let password = req.body.password
  
  const tokenUser = req.cookies.tokenUser

  const plainTextPassword = req.body.password;
  password = await bcrypt.hash(plainTextPassword, saltRounds);

  await usersModel.updateOne({
    tokenUser: tokenUser
  }, {
    password: password
  })

  req.flash('changeSuccess', "Đổi mật khẩu thành công!")
  res.redirect('/')
}


// [GET] /user/infor
module.exports.infor = async (req, res) => {

  res.render(`${systemConfig.prefixClient}/pages/user/infor.pug`, {
    titlePage: 'Đăng ký',
  })
}
