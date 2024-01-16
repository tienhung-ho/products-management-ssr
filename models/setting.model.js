const mongoose = require('mongoose');

const settingGeneralSchema = new mongoose.Schema(
  {
    websiteName: String, 
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String
  },
  { timestamps: true }
)

const SettingGeneral = mongoose.model('SettingGeneral', settingGeneralSchema);

module.exports= SettingGeneral;
