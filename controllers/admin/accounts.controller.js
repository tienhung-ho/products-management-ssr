
const accountsModel = require('../../models/accounts.model')
const roleModel = require('../../models/role.model')
const systemConfig = require('../../config/system/index')
const saltRounds = Number(process.env.SALTROUNDS)

// hash
const bcrypt = require('bcrypt');

// [GET] /admin/accounts/index
module.exports.index = async (req, res) => {
  const records = await accountsModel.find({
    deleted: false,
  })

  for (const record of records) {
    const role = await roleModel.findOne({
      _id: record.role_id
    })

    record.role = role
  }

  res.render(`${systemConfig.prefixAdmin}/pages/accounts/index`, {
    titlePage: 'Acounts',
    records
  })
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await roleModel.find({
    deleted: false
  })

  res.render(`${systemConfig.prefixAdmin}/pages/accounts/create`, {
    titlePage: 'Acounts create',
    roles,
  })
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {

  try {

    const plainTextPassword = req.body.password;

    req.body.password = await bcrypt.hash(plainTextPassword, saltRounds);
    req.flash('changeSuccess', 'Tạo mới thành công')
    await accountsModel.create(req.body)
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
  }
  catch (err) {
    req.flash('changeError', 'Tạo mới thất bại')
  }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  const id = req.params.id

  const roles = await roleModel.find({
    deleted: false
  })

  const record = await accountsModel.findOne({
    _id: id
  })

  res.render(`${systemConfig.prefixAdmin}/pages/accounts/edit`, {
    titlePage: 'Acounts create',
    record,
    roles
  })
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id
    if (req.body.password) {
      const plainTextPassword = req.body.password;
      req.body.password = await bcrypt.hash(plainTextPassword, saltRounds);
    }
    else {
      delete req.body.password
    }

    await accountsModel.findOneAndUpdate({
      _id: id
    },
      req.body
    )
    req.flash('changeSuccess', 'Thay đổi thành công')
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
  }
  catch(err) {
    console.log(err);
    req.flash('changeError', 'Thay đổi KHÔNG thành công')
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
  }
}
