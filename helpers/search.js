module.exports = (query) => {
    const searchObject = {
        keyword: "",
        regex: ""
    }

    if (query.keyword) {
        searchObject.keyword = query.keyword
        searchObject.regex = new RegExp(searchObject.keyword, "i")
    }

    return searchObject
}