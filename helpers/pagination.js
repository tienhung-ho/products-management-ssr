module.exports = (query, paginationObject) => {

    if (query.page) {
        paginationObject.currentPage = parseInt(query.page)
    }
    
    paginationObject.skip = (paginationObject.currentPage - 1) * paginationObject.limit

    paginationObject.totalPage = Math.ceil(paginationObject.totalProduct / paginationObject.limit)
    return paginationObject
}