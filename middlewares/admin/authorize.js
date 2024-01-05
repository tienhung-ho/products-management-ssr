
const systemConfig = require('../../config/system/index')
const accountsModel = require('../../models/accounts.model')
const rolesModel = require('../../models/role.model')

module.exports.requireAuthorize = async (req, res, next) => {
  if (req.cookies.token) {
    const user = await accountsModel.findOne({
      token: req.cookies.token
    })

    if (user) {
      const role = await rolesModel.findOne({
        _id: user.role_id
      }).select('title permissions')

      res.locals.user = user
      res.locals.role = role
      next()
    }
    else {
      res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
      return
    }

  }
  else {
    res.redirect(`/${systemConfig.prefixAdmin}/auth/login`)
    return
  }

}
