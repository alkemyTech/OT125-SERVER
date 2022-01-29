const { Organization } = require('../models/index');
//const errorHandler = require('../utils/errorHandler');

module.exports.getOneOrg = async(orgId) => {
    try {
        const orgFound = await Organization.findOne({
            where: {
                id: orgId
            },
            attributes: ['name', 'image', 'phone', 'address']
        });

        if(!orgFound) {
            return {statusCode:404, response: 'not_found'}
        } else {
            return {statusCode:200, response: orgFound};
        }
        
    } catch (error) {
        console.error(error).status(500);
    }
};