const { Member } = require('../models/index');
const { handleError } = require('../utils/errorHandler');

exports.create = async (member, cb) => {
  Member.findOrCreate({
    where: {
      name: member.name,
    },
    defaults: {
      name: member.name,
      facebookUrl: member.facebookUrl,
      instagramUrl: member.instagramUrl,
      linkedinUrl: member.linkedinUrl,
      image: member.image,
      description: member.description
    }
  })
    .then((result) => {
      if (!result[1]) {
        let err = new Error(`Activity already exists`);
        err.name = 'duplicated_entry';
        err.entity={name:'member',key:'name',keyValue:member.name}
        errJSON = handleError(err)
        return cb(errJSON)

      }
      return cb(result[0]);
    })
    .catch((err) => {
      errJSON = handleError(err);
      return cb(errJSON);
    });
};

exports.getAll = async()=>{
  const res = await Member.findAndCountAll()
  .then(dbResult => dbResult)
  return res;
}

exports.getOne = async(_id)=>{
  try {
    const result = await Member.findByPk(_id)
    if (!result){
      let err = new Error(`not_found`);
      err.name = 'not_found';
      err.entity={name:'Member',key:'id',keyValue:_id};
      errJSON = handleError(err)
      return [null,errJSON]

    }
    return [result, null];

  } catch (e) {
    errJSON = handleError(e);
    return [null, errJSON];
  }
}

exports.setOne = async (_id, body, cb) => {
  Member.update(
    {
      name: body.name,
      facebookUrl: body.facebookUrl,
      instagramUrl: body.instagramUrl,
      linkedinUrl: body.linkedinUrl,
      image: body.image,
      description: body.description
    }, {
    where: {
      id: _id
    }
  })
    .then(result => {
      if (result == 0) {
        let err = new Error(`not_found`);
        err.name = 'not_found';
        err.entity={name:'Member',key:'id',keyValue:_id};
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

exports.delete = async (_id) => {
  try{
    [result,err] = await this.getOne(_id)
    if (err){
      return err
    }else{
      result.destroy().then(deleted => deleted)
      return { statusCode: 202, message: { deleteStatus: `Member with id ${_id} deleted successfully.` } }
    }

  }catch(err){
    errJSON = handleError(err);
    return errJSON

  }

}
