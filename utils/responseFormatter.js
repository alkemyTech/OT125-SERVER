
module.exports = (response) =>{

    if(response.error){
        const {statusCode,message} = response.error
        return{statusCode,response:{ error:message }}
    }else{
        const {statusCode,object} = response
        console.log(object)
        return {statusCode,response:{ data:{...object.dataValues}}}
    }

}