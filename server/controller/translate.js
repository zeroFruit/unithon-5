import _ from 'lodash';
import request from 'request';
import { NAVER_ROOT_URL, CLIENT_ID, CLIENT_SECRET } from '../config/NAVERTranslate';
import logger from '../config/logger';
import { Album } from '../model/album';

function translateTextEndPoint(req, res) {
  const { captions: { text, confidence } } = req.body.description;
  
  const options = {
    url: NAVER_ROOT_URL,
    form: {
      text,
      source: 'en',
      target: 'ko'
    },
    headers: {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id': CLIENT_ID,
      'X-Naver-Client-Secret': CLIENT_SECRET
    }
  };
  request.post(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const jsonBody = JSON.parse(body);
      const translatedText = jsonBody.message.result.translatedText;

      new Album({
        link: req.body.Location,
        description: translatedText
      }).add()
        .then(() => {
          return res.json({
            translatedText,
            url: req.body.Location,
            message: 'SUCCESS'
          });
        })
        .catch(err => {
          logger.error('[controller/translate]', err);
          res.status(500).json({ message: 'SERVER_ERROR' });
        });
    } else {
      logger.info('[controller/translateTextEndPoint]', error, response.statusCode);
      return res.status(response.statusCode).json({ message: 'SERVER_ERROR' });
    }
  });
}


module.exports = {
  translateTextEndPoint
};
