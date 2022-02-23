const repo = require('../repositories/members')

const getPagination = (page) => {
    const limit = 10
    const offset = page ? limit *(page-1) : 0;
    return { limit, offset };
}

const getPagingData = (data, page, limit) => {
    const url = `/members?page=`
    const { count: totalItems, rows: members } = data;
    const currentPage = page ? +page : 1;
    const finalPage = Math.ceil(totalItems / limit) ;
    const nextPage = totalItems/limit > page ? (currentPage+1) : null
    const previousPage = currentPage >1 && currentPage<=finalPage ? currentPage-1 : null
    let metadata = {finalPage}
    if(previousPage) metadata.previousPage = url+previousPage;
    if(nextPage) metadata.nextPage = url+nextPage
    return { statusCode:200, response:{ members, metadata} };
   
};

const getMembers = async (page) =>{
    const filter = getPagination(page)
    const resp = repo.getAll(filter).then(response=>{
        return getPagingData(response,page,filter.limit)
    })
    return resp
}

const MembersService = {
    getPagination,
    getPagingData,
    getMembers
}

module.exports = MembersService