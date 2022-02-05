const { Organization } = require('../models/index');
const responseParser = require('../utils/responseFormatter');

module.exports.getOneOrg = async (orgId) => {
    try {
        const orgFound = await Organization.findOne({
            where: {
                id: orgId
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
        console.error(error).status(500);
    }
};

module.exports.updateOrg = async (id, body) => {
    try {
        const orgFound = await Organization.findOne({
            where: {
                id: id
            }
        });

        if (!orgFound) {
            return responseParser({ statusCode: 404, object: { message: 'not_found' } })
        } else {
            const update = await orgFound.update({
                name: body.name,
                image: body.image,
                address: body.address,
                phone: body.phone,
                email: body.email,
                welcomeText: body.welcomeText,
                aboutUsText: body.aboutUsText

            });
            await update.save();
            return responseParser({ statusCode: 200, object: update });
        }

    } catch (error) {
        console.error(error).status(500);
    }
}