

module.exports.newPriceProducts = (products) => {
  const newProductsFeatured = products.map(item => {
    item.newPrice = ((item.price * (100 - item.discountPercentage)) / 100).toFixed(0)
    return item
  })
  return newProductsFeatured
}
