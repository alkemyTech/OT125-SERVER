const roleRepository = require('../repositories/role')

module.exports.obtain = async (req,res, next)=>{
    try {
        let [roles, err] = await roleRepository.getRoles(req.query.name)
        if(err){
            res.json({err})
        }
        res.json({roles})
    }
    catch(err){
        next(err)
    }

}