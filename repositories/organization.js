const { Organization } = require('../models/index');
const responseParser = require('../utils/responseFormatter');

module.exports.getOneOrg = async () => {
    try {
        const orgFound = await Organization.findOne({
            where: {
                id: 1
            },
            attributes: [
                'name',
                'image',
                'phone',
                'address',
                'url_facebook',
                'url_linkedin',
                'url_instagram']
        });

        if (!orgFound) {
            return responseParser({ statusCode: 404, object: { message: 'not_found' } })
        } else {
            return responseParser({ statusCode: 200, object: orgFound });
        }

    } catch (error) {
        return { statusCode: 500, response: { error: error } };
    }
};

module.exports.updateOrg = async (body) => {
    try {
        const orgFound = await Organization.findOne({
            where: {
                id: 1
            }
        });

        if (!orgFound) {
            return responseParser({ statusCode: 404, object: { message: 'not_found' } })
        } else {
            const organizationUpdate = await orgFound.update({
                name: body.name,
                image: body.image,
                address: body.address,
                phone: body.phone,
                email: body.email,
                welcomeText: body.welcomeText,
                aboutUsText: body.aboutUsText

            });
            await organizationUpdate.save();
            return responseParser({ statusCode: 200, object: organizationUpdate });
        }

    } catch (error) {
        return { statusCode: 500, response: { error: error } };;
    }
}