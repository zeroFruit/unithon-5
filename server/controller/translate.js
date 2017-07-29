import _ from 'lodash';
import request from 'request';
import { NAVER_ROOT_URL, CLIENT_ID, CLIENT_SECRET } from '../config/NAVERTranslate';
import logger from '../config/logger';

function translateText(req, res) {
  var query = req.body.text;
  var request = require('request');
  var options = {
    url: NAVER_ROOT_URL,
    form: {
      source: 'en',
      target: 'ko',
      text: query
    },
    headers: { 'X-Naver-Client-Id': CLIENT_ID, 'X-Naver-Client-Secret': CLIENT_SECRET }
  };
  request.post(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
    }
  });
}

function translateTextEndPoint(req, res) {
  const { captions: { text } } = req.body.description;
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
      const translatedText = jsonBody.message.result;

      return res.json({
        translatedText,
        message: 'SUCCESS'
      });
    } else {
      logger.info('[controller/translateTextEndPoint]', error, response.statusCode);
      return res.status(response.statusCode).json({ message: 'SERVER_ERROR' });
    }
  });
}

module.exports = {
  translateText,
  translateTextEndPoint
};
