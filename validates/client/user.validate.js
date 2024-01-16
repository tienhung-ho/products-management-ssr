

module.exports.register = (req, res, next) => {
    
  if (!req.body.fullName) {
      req.flash('changeError', 'Tên không được để trống!')
      res.redirect('back')
      return
  }

  if (req.body.fullName < 5) {
      req.flash('changeError', 'Tên phải có ít nhất 5 ký tự!')
      res.redirect('back')
      return
  }
  next()
}

module.exports.resetPassword = (req, res, next) => {
    
  if (!req.body.password) {
      req.flash('changeError', 'Mật khẩu không được để trống!')
      res.redirect('back')
      return
  }

  if (!req.body.confirmPassword) {
      req.flash('changeError', 'Nhập lại mật khẩu!')
      res.redirect('back')
      return
  }

  if (req.body.confirmPassword !== req.body.password) {
    req.flash('changeError', 'Mật khẩu không khớp!')
    return
  }
  next()
 
}
