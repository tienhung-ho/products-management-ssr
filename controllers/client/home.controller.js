module.exports.index = (req, res) => {
    res.render('client/pages/home/index.pug', {
        titlePage: 'Trang chu'
    })
}
