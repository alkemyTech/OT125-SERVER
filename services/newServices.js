const newsRepository = require('../repositories/newRepositories');
const {paginate} = require('../utils/pagination')
const lengthResult = 10;

module.exports = {
  create: async (newToCreate) => {
    return await newsRepository.create(newToCreate);
  },
  getOne: async (id) => {
    let oneNew = await newsRepository.getOne(id);
    if (!oneNew) {
      const error = new Error(`Not found id: ${id}`);
      error.status = 404;
      throw error;
    }
    return oneNew;
  },
  getAll: async (req) => {
    return await paginate(newsRepository.getAll, req, lengthResult);
  },
  update: async (id, data) => {
    let newAtUpdate = await newsRepository.getOne(id);
    if (!newAtUpdate) {
      const error = new Error(`Not found id: ${id}`);
      error.status = 404;
      throw error;
    }
    await newsRepository.update(id, data);
    return await newsRepository.getOne(id);
  },
  remove: async (id) => {
    const newsAtRemove = await newsRepository.remove(id);
    if (!newsAtRemove) {
      const error = new Error(`Not found id: ${id}`);
      error.status = 404;
      throw error;
    }
  },
  getComments: async (id) => {
    const comments = await newsRepository.getComments(id);
    if (!comments) {
      const error = new Error(`Not found id: ${id}`);
      error.name = 'not_found';
      throw error;
    }
    return comments;
  },
};
