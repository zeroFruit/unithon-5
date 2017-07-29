import AWS from 'aws-sdk';
import fs from 'fs';
import im from 'imagemagick';
import path from 'path';
import logger from '../config/logger';

AWS.config.region = 'ap-northeast-2';

const s3 = new AWS.S3();
const BUCKET_NAME = 'eye.ai';

const uploadImg = (imgFile, callback) => {
  const { name, type, path } = imgFile.uploadfile;
  const newKey = `${Date.now()}-${name}`;
  const params = {
    Bucket: BUCKET_NAME,
    Key: newKey,
    ACL: 'public-read',
    Body: fs.createReadStream(path),
    ContentType: type
  };

  s3.upload(params, (err, data) => {
    if (err) {
      logger.error('[S3Service/uploadImg]', err);
      console.log(err);
      return callback(err);
    }
    return callback(null, data);
  });
};

module.exports = {
  uploadImg
};
