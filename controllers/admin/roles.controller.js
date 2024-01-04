
const rolesModel = require('../../models/role.model')
const systemConfig = require('../../config/system/index')


// [GET] /admin/roles
module.exports.index = async (req, res) => {

  const group = await rolesModel.find({
    deleted: false

  })

  res.render(`${systemConfig.prefixAdmin}/pages/roles`, {
    titlePage: 'Roles'
    ,group
  }) 
}

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
  res.render(`${systemConfig.prefixAdmin}/pages/roles/create`, {
    titlePage: 'Roles create'
    ,group: []
  }) 
}

// [POST] /admin/roles/create
module.exports.createPost= async (req, res) => {
  await rolesModel.create(req.body)
  req.flash('changeSuccess', 'Thêm mới thành công')
  res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}

// [DELETE] /admin/create/roles/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id

  await rolesModel.updateOne(
      { _id: id }, 
      { deleted: true, deletedAt: new Date() }
  )

  req.flash('changeSuccess', 'Sản phẩm đã được xoá thành công!')

  res.redirect('back')
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {

  const id = req.params.id
  const record = await rolesModel.findOne({
    _id: id
  })

  res.render(`${systemConfig.prefixAdmin}/pages/roles/edit`, {
    titlePage: 'Roles edit'
    ,record
  }) 
}

// [GET] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id
  await rolesModel.findOneAndUpdate({
    _id: id
  },
    req.body
  )
  req.flash('changeSuccess', 'Chỉnh sửa thành công')
  res.redirect(`/${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {

  const records = await rolesModel.find({
    deleted: false
  })

  res.render(`${systemConfig.prefixAdmin}/pages/roles/permissions`, {
    titlePage: 'Roles permissions',
    records

  }) 
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions)
    
    permissions.forEach(async item => {
      await rolesModel.findOneAndUpdate(
        {
        _id: item.id
      }, 
        {
        permissions: item.permissions
      }
      )
    })
    req.flash('changeSuccess', 'Cập nhật quyền mới thành công!')
    res.redirect('back')

  }
  catch(err) {
    req.flash('changeError', 'Cập nhật quyền mới KHÔNG thành công!')
  }
}


