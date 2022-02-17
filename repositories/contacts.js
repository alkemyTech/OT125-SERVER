const { Contacts } = require('../models/index');
const responseParser = require('../utils/responseFormatter');
const { formReceivedEmail } = require('../services/email');

module.exports.createContact = async (body) => {
    try {
        const newContact = await Contacts.create({
            name: body.name,
            phone: body.phone,
            email: body.email,
            message: body.message
        });
        formReceivedEmail(newContact);
        return responseParser({ statusCode: 201, object: newContact });
    } catch (error) {
        return { statusCode: 500, response: { error: error } };
    }
};

module.exports.getContacs = async () => {
    try {
        const contactList = await Contacts.findAll();
        return responseParser({ statusCode: 200, object: contactList })
    } catch (error) {
        return { statusCode: 500, response: { message: error } };
    }
};

