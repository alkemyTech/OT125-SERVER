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

exports.setOne = async()=>{}

exports.setOne = async () => {}

exports.delete = async () => {}
