const newServices = require('../services/newServices');

module.exports = {
  create: async (req, res, next) => {
    try {
      let newCreated = await newServices.create(req.body);
      res.status(201).json({ msg: 'Created succesfully', data: newCreated });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getAll: async (req, res, next) => {
    try {
      let allNews = await newServices.getAll(req);
      res.status(200).json({ length: allNews.length, data: allNews });
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req, res, next) => {
    try {
      let oneNew = await newServices.getOne(req.params.id);
      res.status(200).json({ data: oneNew });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      let newUpdate = await newServices.update(req.params.id, req.body);
      res.status(200).json({ msg: 'Updated successfully', data: newUpdate });
    } catch (error) {
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      await newServices.remove(req.params.id);
      res
        .status(200)
        .json({ msg: `New ${req.params.id} removed successfully` });
    } catch (error) {
      next(error);
    }
  },
};
