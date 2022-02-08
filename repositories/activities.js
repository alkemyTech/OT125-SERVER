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
        err.name = 'duplicated_entry';
        err.entity=result[0];
        errJSON = handleError(err)
        return cb(errJSON)

      }
      return cb(result[0])

    }).catch(err => {
      errJSON = handleError(err)
      return cb(errJSON)
    })

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
        err.entity=body;
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