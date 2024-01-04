const systemConfig = require('../../config/system/index')
const accountsModel = require('../../models/accounts.model')


// hash
const bcrypt = require('bcrypt');

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {

  res.render(`${systemConfig.prefixAdmin}/pages/authorize/login.pug`, {
    titlePage: 'Login'
  })
}


// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    const user = await accountsModel.findOne({
      email: email,
      deleted: false
    })
    if (!user) {
      console.log(user);
      req.flash('changeError', 'Email không tồn tại!')
      res.redirect('back')
      return
    }
    else {
      const hashedPasswordFromDatabase = user.password;
      const isMatch = bcrypt.compareSync(password, hashedPasswordFromDatabase);

      if (isMatch) {
        req.flash('changeSuccess', 'Đúng')
        res.redirect(`/${systemConfig.prefixAdmin}/dashboard`)
      } else {
        req.flash('changeError', 'Sai mật khẩu')
        res.redirect('back')
      }

    }

  }
  catch (err) {
    req.flash('changeError', '404 not found ')
  }
}
