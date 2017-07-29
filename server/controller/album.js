import _ from 'lodash';
import { uploadImg } from '../helpers/S3Service';
import { MS_ROOT_URL, SUB_KEY } from '../config/MSCognitive';
import logger from '../config/logger';

function addAlbum(req, res, next) {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    const { name, path } = files['0'];

    uploadImg(name, path, (err, data, link) => {
      if (err) {
        logger.error('[middlewares/uploadImg]', err);
        return res.status(500).json({ message: 'SERVER_ERROR' });
      }

      req.body.link = link;
      next();
    });
  });
}

function analyzeImg(req, res) {
  const url = _.pick(req.body, ['url']);
  console.log('c', url);
  axios({
    method: 'post',
    url: MS_ROOT_URL,
    header: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': SUB_KEY
    },
    body: { url }
  }).then(response => {
    return res.json({ message: 'SUCCESS_MESSAGE' });
  }).catch(err => {
    logger.error('[controller/album/analyzeImg]', err);
    return res.status(500).json({ message: 'SERVER_ERROR' });
  });
}

module.exports = {
  addAlbum,
  analyzeImg
};
