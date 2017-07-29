import _ from 'lodash';
import request from 'request';
import formidable from 'formidable';
import { uploadImg } from '../helpers/S3Service';
import { MS_ROOT_URL, SUB_KEY } from '../config/MSCognitive';
import logger from '../config/logger';

function addAlbum(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'SERVER_ERROR' });
    }
    uploadImg(files, (err, result) => {
      if (err) {
        logger.error('[controller/addAlbum]', err);
        return res.status(500).json({ message: 'SERVER_ERROR' });
      }
      req.body.Location = result.Location;

      return res.json({ message: 'SUCCESS' });
    });
  });
}

function addAlbumMiddleware(req, res, next) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'SERVER_ERROR' });
    }

    uploadImg(files, (err, result) => {
      if (err) {
        logger.error('[controller/addAlbum]', err);
        return res.status(500).json({ message: 'SERVER_ERROR' });
      }
      logger.info('[controller/addAlbumMiddleware] SUCCESS');
      req.body.Location = result.Location;
      next();
    });
  });
}

function analyzeImg(req, res, next) {
  const url = _.pick(req.body, ['url']).url;
  const options = {
    url: MS_ROOT_URL,
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': SUB_KEY
    },
    body: {
      url
    },
    method: 'post',
    json: true
  };
  request(options, (err, response, body) => {
    if (err) {
      return res.status(500).json({ message: 'SERVER_ERROR' });
    }
    const { description: { tags, captions: { text, confidence } } } = body;
    return res.json({ message: 'SUCCESS', tags, captions: { text, confidence } });
  });
}

function analyzeImgMiddleware(req, res, next) {
  const url = req.body.Location;
  const options = {
    url: MS_ROOT_URL,
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': SUB_KEY
    },
    body: {
      url
    },
    method: 'post',
    json: true
  };
  request(options, (err, response, body) => {
    if (err) {
      return res.status(500).json({ message: 'SERVER_ERROR' });
    }

    const { description: { tags, captions } } = body;
    const text = captions[0].text;
    const confidence = captions[0].confidence;

    req.body.description = {
      tags,
      captions: {
        text,
        confidence
      }
    };

    logger.info('[controller/analyzeImgMiddleware] SUCCESS');
    next();
  });
}

module.exports = {
  addAlbum,
  analyzeImg,
  addAlbumMiddleware,
  analyzeImgMiddleware
};
