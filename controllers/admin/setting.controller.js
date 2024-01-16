const systemConfig = require('../../config/system/index')
const settingModel = require('../../models/setting.model')

// [GET] /admin/settings/general
module.exports.general = async (req, res) => {

  const settingGeneral = await settingModel.findOne({})

  res.render(`${systemConfig.prefixAdmin}/pages/setting/general`, {
    titlePage: 'Cài đặt chung',
    settingGeneral
  })
}

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {

  const settingGeneral = await settingModel.findOne({})

  if (settingGeneral) {
    await settingModel.updateOne({
      _id: settingGeneral.id
    }, req.body )
  }

  else {
    
    const record = new settingModel(req.body)
    await record.save()
    req.flash('changeSuccess', "Cập nhật thành công")
  
    res.redirect('back')
  }

}
