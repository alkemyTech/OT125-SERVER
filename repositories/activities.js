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
        err.entity={name:'Activity',key:'name',keyValue:activity.name};
        errJSON = handleError(err)
        return cb([null,errJSON])

      }
      return cb([result[0],null])

    }).catch(err => {
      errJSON = handleError(err)
      return cb([null,errJSON])
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
        err.entity={name:'Activity',key:'Activity',keyValue:activities.name};
        errJSON = handleError(err)
        return cb([null,errJSON])
      }
      return cb([body,null])

    })
    .catch(err => {
      errJSON = handleError(err)
      return cb([null,errJSON])
    })

}

exports.getAll = async ()=>{
  try {
    const result = await activities.findAll()
    return [result, null];

  } catch (e) {
    errJSON = handleError(e);
    return [null, errJSON];
  }
}

exports.getOne = async (_id)=>{
  try {
    const result = await activities.findByPk(_id)
    if (!result){
      let err = new Error(`not_found`);
      err.name = 'not_found';
      err.entity={name:'Activity',key:'id',keyValue:_id};
      errJSON = handleError(err)
      return [null,errJSON]

    }
    return [result, null];

  } catch (e) {
    errJSON = handleError(e);
    return [null, errJSON];
  }
}

exports.delete = async (_id)=>{
  try{
    [result,err] = await this.getOne(_id)
    if (err){
      let err = new Error(`not_found`);
      err.name = 'not_found';
      err.entity={name:'Activity',key:'id',keyValue:_id};
      errJSON = handleError(err)
      return [null,errJSON]
    }else{
      result.destroy().then(deleted => deleted)
      let response = { statusCode: 202, message: { deleteStatus: `Activity with id ${_id} deleted successfully.` } }
      return [response,null]
    }

  }catch(err){
    errJSON = handleError(err);
    return [null,errJSON]

  }

}