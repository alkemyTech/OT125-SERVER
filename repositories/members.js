const { Member } = require('../models/index');
const { handleError } = require('../utils/errorHandler');

exports.create = async (member, cb) => {
  Member.findOrCreate({
    where: {
      name: member.name,
    },
    defaults: {
      name: member.name,
      content: member.content,
      image: member.image,
    },
  })
    .then((result) => {
      if (!result[1]) {
        let err = new Error(`Activity already exists`);
        err.name = 'SequelizeUniqueConstraintError';
        errJSON = handleError(err);
        return cb(errJSON);
      }
      return cb(result[0]);
    })
    .catch((err) => {
      errJSON = handleError(err);
      return cb(errJSON);
    });
};

exports.getAll = async () => {
  return await Member.findAll();
};

exports.setOne = async () => {};

exports.delete = async () => {};
