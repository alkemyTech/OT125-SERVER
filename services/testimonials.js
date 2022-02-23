const repo = require('../repositories/testimonial');
const { handleError: errP } = require('../utils/errorHandler');
const responseParser = require('../utils/responseFormatter');

const getPagination = (page) => {
    const limit = 10
    const offset = page ? limit *(page-1) : 0;
    return { limit, offset };
}

const getPagingData = (data, page, limit) => {
    const url = `/testimonials?page=`
    const { count: totalItems, rows: testimonials } = data;
    const currentPage = page ? +page : 1;
    const finalPage = Math.ceil(totalItems / limit) ;
    const nextPage = totalItems/limit > page ? (currentPage+1) : null
    const previousPage = currentPage >1 && currentPage<=finalPage ? currentPage-1 : null
    let metadata = {finalPage}
    if(previousPage) metadata.previousPage = url+previousPage;
    if(nextPage) metadata.nextPage = url+nextPage
    if(testimonials.length > 0 || currentPage == 1)
    {
        return { statusCode:200, response:{ testimonials, metadata} };
    }
   
    return responseParser({ error: errP({name:'not_found', entity:{name:'Testimonial', key:'page',keyValue:page}}) });
};



const getTestimonials = async (page) =>{
    const filter = getPagination(page)
    const resp = repo.getTestimonials(filter).then(response=>{
        return getPagingData(response,page,filter.limit)
    })
    return resp
}

const TestimonialService = {
    getPagination,
    getPagingData,
    getTestimonials
}

module.exports = TestimonialService