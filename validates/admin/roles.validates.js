
module.exports.createPost = (req, res, next) => {
    
  if (!req.body.title) {
      req.flash('errorMessage', 'Tiêu đề không được để trống!')
      res.redirect('back')
      return
  }

  if (req.body.title.length < 5) {
      req.flash('errorMessage', 'Tiêu đề phải có ít nhất 5 ký tự!')
      res.redirect('back')
      return
  }

  if (!req.body.description) {
    req.flash('errorMessage', 'Mô tả không được để trống!')
    res.redirect('back')
    return
  }

  next()
}
