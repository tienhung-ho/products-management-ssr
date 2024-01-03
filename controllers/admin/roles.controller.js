
const rolesModel = require('../../models/role.model')
const systemConfig = require('../../config/system/index')


// [GET] /admin/
module.exports.index = async (req, res) => {

  const group = await rolesModel.find({

  })

  res.render(`${systemConfig.prefixAdmin}/pages/roles`, {
    titlePage: 'Roles'
    ,group
  }) 
}

// [GET] /admin/create
module.exports.create = async (req, res) => {
  res.render(`${systemConfig.prefixAdmin}/pages/roles/create`, {
    titlePage: 'Roles'
    ,group: []
  }) 
}

// [POST] /admin/create
module.exports.createPost= async (req, res) => {
  await rolesModel.create(req.body)
  req.flash('success', 'Thêm mới thành công')
  res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}
