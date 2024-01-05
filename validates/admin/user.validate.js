
const accountsModel = require('../../models/accounts.model')

module.exports.userValiRes = async (req, res, next) => {
  
  if (req.body.email) {
    const user = await accountsModel.find({
      email: req.body.email
    })

    if (user) {
      req.flash('errorMessage', 'Email đã tồn tại!')
      res.redirect('back')
    }
    else {
      next()
    }

  }
  else {
      req.flash('errorMessage', 'Email không được để trống!')
      res.redirect('back')
      return
  }

}
