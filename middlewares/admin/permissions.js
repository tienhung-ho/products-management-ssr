
module.exports.editProduct = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('products__edit')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}



module.exports.createProduct = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('products__create')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}

module.exports.deleteProduct = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('products__delete')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}



module.exports.editProductCate = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('products-ct__edit')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}

module.exports.createProductCate = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('products-ct__edit')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}

module.exports.editRole = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('roles__edit')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}

module.exports.deleteRole = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('roles__delete')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}

module.exports.createRole = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('roles__create')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}

module.exports.permissionsRole = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('roles__permissions')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}

module.exports.editAccount = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('accounts__edit')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}

module.exports.createAccount = (req, res, next) => {
  const permissions = res.locals.role.permissions

  if (permissions.includes('accounts__create')) {
    next()
  }
  else {
    req.flash('changeError', 'Tài khoản của bạn không có quyền này!')
    res.redirect('back')
  }
}
