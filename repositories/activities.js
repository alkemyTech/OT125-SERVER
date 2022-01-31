const { activities } = require('../models/index');
const { handleError } = require('../utils/errorHandler');

exports.create = async (activity, cb) => {
  activities.findOrCreate({
    where: {
      name: activity.name,

    },
    defaults: {
      name: activity.name,
      content: activity.content,
      image: activity.image
    }
  })
    .then(result => {
      if (!result[1]) {
        let err = new Error(`Activity already exists`);
        err.name = 'SequelizeUniqueConstraintError';
        errJSON = handleError(err)
        cb(err)

      }
      cb(result[0])

    }).catch(err => {
      errJSON = handleError(err)
      cb(errJSON)
    })

}