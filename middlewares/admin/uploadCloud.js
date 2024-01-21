const uploadToCloud = require('../../helpers/uploadToCloud') 

module.exports.upload = async (req, res, next) => {
  if (req.file) {
    const result = await uploadToCloud(req.file.buffer);
    req.body[req.file.fieldname] = result
  }
  next()
}


