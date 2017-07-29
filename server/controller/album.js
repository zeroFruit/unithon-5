import _ from 'lodash';
import request from 'request';
import formidable from 'formidable';
import { uploadImg } from '../helpers/S3Service';
import { MS_ROOT_URL, SUB_KEY } from '../config/MSCognitive';
import logger from '../config/logger';
import { Album } from '../model/album';
import {
  appendTsToDocs,
  aggregateDocsByTs
} from '../helpers';

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

    const { description: { captions } } = body;
    const text = captions[0].text;
    const confidence = captions[0].confidence;

    req.body.description = {
      captions: {
        text,
        confidence
      }
    };

    logger.info('[controller/analyzeImgMiddleware] SUCCESS');
    next();
  });
}

const addAlbum = (req, res) => {
  const { imgUrl, uid, translatedText } = _.pick(req.body, ['imgUrl', 'uid', 'translatedText']);

  new Album({ link: imgUrl, uid, description: translatedText }).add().then(() => {
    logger.info('[controller/addAlbum] SUCCESS');
    return res.json({ message: 'SUCCESS' });
  }).catch(err => {
    logger.error('[controller/addAlbum]');
    console.log(err);
    return res.status(500).json({ message: 'FAIL' });
  });
};

async function getAlbums(req, res) {
  const { uid } = _.pick(req.query, ['uid']);
  try {
    const albums = await Album.getAlbumsByUid(uid);

    logger.info('[controller/getAlbums] SUCCESS');
    return res.json({ message: 'SUCCESS', albums });
  } catch (err) {
    logger.error('[controller/getAlbums]', err);
    return res.status(500).json({ message: 'SERVER_ERROR' });
  }
}

module.exports = {
  addAlbumMiddleware,
  analyzeImgMiddleware,
  addAlbum,
  getAlbums
};
