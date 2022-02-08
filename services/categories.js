const repo = require('../repositories/category')

const getPagination = (page) => {
    const limit = 10
    const offset = page ? limit *(page-1) : 0;
    return { limit, offset };
}

const getPagingData = (data, page, limit) => {
    const url = `/categories?page=`
    const { count: totalItems, rows: categories } = data;
    const currentPage = page ? +page : 1;
    const finalPage = Math.ceil(totalItems / limit) ;
    const nextPage = totalItems/limit > page ? (currentPage+1) : null
    const previousPage = currentPage >1 && currentPage<=finalPage ? currentPage-1 : null
    let metadata = {finalPage}
    if(previousPage) metadata.previousPage = url+previousPage;
    if(nextPage) metadata.nextPage = url+nextPage
    return { statusCode:200, response:{ categories, metadata} };
   
};

const getCategories = async (page) =>{
    const filter = getPagination(page)
    const resp = repo.getCategories(filter).then(response=>{
        return getPagingData(response,page,filter.limit)
    })
    return resp
}

const CategoryService = {
    getPagination,
    getPagingData,
    getCategories
}

module.exports = CategoryService