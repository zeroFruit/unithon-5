import _ from 'lodash';
import { uploadImg } from '../helpers/S3Service';
import { NAVER_ROOT_URL, CLIENT_ID, CLIENT_SECRET } from '../config/NAVERTranslate';
import logger from '../config/logger';

function translateText(req, res) {
   var query = req.body.text;
   console.log(query + ' ' + CLIENT_ID + ' ' + CLIENT_SECRET);
   var api_url = NAVER_ROOT_URL ;
   var request = require('request');
   var options = {
       url: api_url,
       form: {'source':'en', 'target':'ko', 'text':query},
       headers: {'X-Naver-Client-Id':CLIENT_ID, 'X-Naver-Client-Secret': CLIENT_SECRET}
    };
   request.post(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 }

 module.exports = {
   translateText
 };
