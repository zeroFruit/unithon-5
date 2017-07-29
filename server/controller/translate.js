import _ from 'lodash';
import request from 'request';
import { NAVER_ROOT_URL, CLIENT_ID, CLIENT_SECRET } from '../config/NAVERTranslate';
import logger from '../config/logger';
import { Album } from '../model/album';

function translateTextEndPoint(req, res) {
  console.log('translateTextEndPoint Start');

  const { captions: { text } } = req.body.description;
  console.log('req.body.description', req.body.description);
  console.log('text', text);

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
    console.log('error', error);
    console.log('body', body);

    if (!error && response.statusCode == 200) {
      const jsonBody = JSON.parse(body);
      const translatedText = jsonBody.message.result;

      new Album({
        link: req.body.Location,
        description: translatedText
      }).add()
        .then(() => res.json({
          translatedText,
          message: 'SUCCESS'
        }))
        .catch(err => {
          console.log(err);
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
