const repo = require('../repositories/contacts');

module.exports = {
    createContact: async (req, res) => {
        try {
            const newContact = await repo.createContact(req.body);
            res.json(newContact.response).status(newContact.statusCode)
        } catch (error) {
            res.json({ error: error }).status(500);
        }
    },

    getContacts: async (req, res) => {
        try {
            const data = await repo.getContacs();
            res.json(data.response).status(data.statusCode)
        } catch (error) {
            console.error(error);
            res.json({ error: error }).status(500);
        }
    }
};