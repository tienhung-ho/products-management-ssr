module.exports.createPost = (req, res, next) => {
    
    if (!req.body.title) {
        req.flash('errorMessage', 'Tiêu đề sản phẩm không được để trống!')
        res.redirect('back')
        return
    }

    if (req.body.title.length < 5) {
        req.flash('errorMessage', 'Tiêu đề sản phẩm phải có ít nhất 5 ký tự!')
        res.redirect('back')
        return
    }

    next()
}