const accountsModel = require('../../models/accounts.model')
const roleModel = require('../../models/role.model')
const systemConfig = require('../../config/system/index')
const saltRounds = Number(process.env.SALTROUNDS)


// hash
const bcrypt = require('bcrypt');

// [GET] /admin/my-account/
module.exports.index = async (req, res) => {
  res.render(`${systemConfig.prefixAdmin}/pages/my-account`, {
    titlePage: 'Profile',
  })
}


// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  try {
    const id = res.locals.user.id

    // if (permissions.includes('accounts__edit')) {

    const roles = await roleModel.find({
      deleted: false
    })

    const record = await accountsModel.findOne({
      _id: id
    })

    res.render(`${systemConfig.prefixAdmin}/pages/my-account/edit`, {
      titlePage: 'Acounts create',
      record,
      roles
    })
    // }
    // else {
    //   return
    // }
  }
  catch (err) {
    console.log(err);
  }
}

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  try {

    const id = res.locals.user.id

    if (req.body.permissions) {

      delete req.body.permissions
    }
    if (req.body.password) {
      const hashedPasswordFromDatabase = res.locals.user.password;
      const isMatch = bcrypt.compareSync(req.body.password, hashedPasswordFromDatabase);
  
      delete req.body.password
  
      if (!isMatch) {
        req.flash('changeError', 'Nhập sai mật khẩu!')
        res.redirect(`/${systemConfig.prefixAdmin}/my-account/edit`)
        return
      }
  
      await accountsModel.findOneAndUpdate({
        _id: id
      },
        req.body
      )
      req.flash('changeSuccess', 'Thay đổi thành công')
      res.redirect(`back`)

    } else {
      return
    }


  }
  catch (err) {
    console.log(err);
    req.flash('changeError', 'Thay đổi KHÔNG thành công')
    res.redirect(`/${systemConfig.prefixAdmin}/my-account`)
  }
}
