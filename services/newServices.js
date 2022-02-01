const newsRepository = require('../repositories/newRepositories');

module.exports = {
    create : async (newToCreate) => {
        return await newsRepository.create(newToCreate)
    },
    getOne : async (id) => {
        let oneNew = await newsRepository.getOne(id);
            if (!oneNew) {
                const error = new Error(`Not found id: ${id}`)
                error.status = 404
                throw error
            }
            return oneNew
    },
    getAll : async () => {
        let allNews = await newsRepository.getAll()
        return allNews
    },
    update : async (id, data) => {
        
    },
    remove : async (id) => {
        const newsAtRemove = await newsRepository.remove(id)
        if (!newsAtRemove) {
            const error = new Error(`Not found id: ${id}`)
            error.status = 404
            throw error
        }
    }
}