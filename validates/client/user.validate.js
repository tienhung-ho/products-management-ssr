

module.exports.register = (req, res, next) => {
    
  if (!req.body.fullName) {
      req.flash('changeError', 'Tiêu đề sản phẩm không được để trống!')
      res.redirect('back')
      return
  }

  if (req.body.fullName < 5) {
      req.flash('changeError', 'Tiêu đề sản phẩm phải có ít nhất 5 ký tự!')
      res.redirect('back')
      return
  }
  next()
}
