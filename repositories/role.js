const db = require('../models/index')

module.exports.getRoles = async (name)=>{
    try{
        if(name){
            var rolesFounded = await db.Role.findOne({where: {name}})
            return [rolesFounded, null]
        }
        rolesFounded = await db.Role.findAll()
        return [rolesFounded, null]
    }
    
    catch(err){
        return [null, err]
    }
}