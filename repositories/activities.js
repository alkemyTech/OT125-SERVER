const {activities} = require('../models/index');
const { handleError } = require('../utils/errorHandler');

exports.create = async (activity) => {
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
      let err = new Error(`Activity already exits`);
      err.name = 'SequelizeUniqueConstraintError';
      errJSON = handleError(err)
      return errJSON

    }
    return result[0]

  }).catch(err => {
    errJSON = handleError(err)
    return errJSON
  })

}