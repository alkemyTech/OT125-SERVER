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
        return cb(errJSON)

      }
      return cb(result[0])

    }).catch(err => {
      errJSON = handleError(err)
      return cb(errJSON)
    })

}

exports.getbyId = async (_id, cb) => {
  activities.findByPk(_id).then(activityFound => cb(activityFound)).catch(err => cb(err))
}

exports.setOne = async (_id, body, cb) => {
  activities.update(
    {
      name: body.name,
      content: body.content,
      iamge: body.image
    }, {
    where: {
      id: _id
    }
  })
    .then(result => {
      if (result == 0) {
        let err = new Error(`Activity not found`);
        err.name = 'not_found';
        errJSON = handleError(err)
        return cb(errJSON)
      }
      return cb(body)

    })
    .catch(err => {
      errJSON = handleError(err)
      return cb(errJSON)
    })

}