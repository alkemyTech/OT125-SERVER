
module.exports = (response) =>{

    if(response.error){
        const {statusCode,message} = response.error
        return{statusCode,response:{ error:message }}
    }else{
        const {statusCode,object,type} = response
        return {statusCode,response:{ data:{ type: type, ...object}}}
    }

}