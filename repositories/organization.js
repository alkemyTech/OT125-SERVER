const { Organization } = require('../models/index');

module.exports.getOneOrg = async (orgId) => {
    try {
        const orgFound = await Organization.findOne({
            where: {
                id: orgId
            },
            attributes: ['name', 'image', 'phone', 'address']
        });

        if (!orgFound) {
            return { statusCode: 404, response: 'not_found' }
        } else {
            return { statusCode: 200, response: orgFound };
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
            return { statusCode: 404, response: 'not_found' }
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
            return { statusCode: 200, response: update }
        }

    } catch (error) {
        console.error(error).status(500);
    }
}