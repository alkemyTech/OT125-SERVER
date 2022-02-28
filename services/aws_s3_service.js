const AWS = require('aws-sdk');
const { PUBLIC_KEY, SECRET_KEY, BUCKET_NAME } = process.env

/**
 * Upload an image to a S3 Bucket
 * @param {string} base64 Ensure this is a base64 data
 * @param {string} filename
 * @returns {string} location(URL) must be saved into the DB
 */
const imageUpload = async (base64, fileName) => {
  AWS.config.setPromisesDependency(require('bluebird'));
  AWS.config.update({ accessKeyId: PUBLIC_KEY, secretAccessKey: SECRET_KEY });

  const s3 = new AWS.S3();
  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  //Getting file type
  const type = base64.split(';')[0].split('/')[1];

  const upload_params = {
    Bucket: BUCKET_NAME,
    Key: `${fileName}.${type}`,
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64',
    ContentType: `image/${type}`

  }
  let _location = '';
  let _key = '';

  try {
    const { Location, Key } = await s3.upload(upload_params).promise();
    _location = Location
    _key = Key

  } catch (err) {
    return err
  }

  return _location;


}

module.exports = {
  imageUpload
}
