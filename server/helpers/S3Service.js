import AWS from 'aws-sdk';
import fs from 'fs';
import im from 'imagemagick';
import path from 'path';
import logger from '../config/logger';

AWS.config.region = 'ap-northeast-2';

const s3 = new AWS.S3();
const BUCKET_NAME = 'eye.ai';

const uploadImg = (Key, userFilePath, cb) => {
  im.identify(userFilePath, (err, features) => {
    if (err || checkImgExtender(features.format)) {
      return cb(err);
    }

    const resizeOption = {
      srcPath: userFilePath,
      width: 300,
      progressive: true
    };

    im.resize(resizeOption, (err, stdout, stderr) => {
      if (err) {
        logger.error(err);
        return cb(err);
      }

      const newKey = `${Date.now()}-${Key}`;
      const params = {
        Bucket: BUCKET_NAME,
        Key: newKey,
        Body: new Buffer(stdout, 'binary'),
        ContentType: features['mime type']
      };

      s3.upload(params, (err, data) => {
        if (err) {
          logger.error(err);
          return cb(err);
        }

        cb(null, data, newKey);
      });
    });
  });
};

const checkImgExtender = format => format === 'JPEG' || format === 'PNG';

module.exports = {
  uploadImg
};
