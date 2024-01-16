

const userModel = require('../../models/users.model')

module.exports.requireAuthorize = async (req, res, next) => {
  if (req.cookies.tokenUser) {
    const user = await accountsModel.findOne({
      tokenUser: req.cookies.tokenUser
    })

    if (user) {

      next()
    }
    else {
      res.redirect(`/user/login`)
      return
    }

  }
  else {
    res.redirect(`/user/login`)
    return
  }

}
