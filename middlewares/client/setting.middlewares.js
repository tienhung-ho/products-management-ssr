
const settingModel = require('../../models/setting.model')

module.exports.settingGeneral = async (req, res, next) => {
  const settingGeneral = await settingModel.findOne({})

  res.locals.settingGeneral = settingGeneral

  next()

}
