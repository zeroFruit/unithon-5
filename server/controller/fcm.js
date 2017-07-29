import _ from 'lodash';
import { SERVER_KEY } from '../config/FCMPush';
import moment from 'moment';
import _FCM from 'fcm-node';
import { FCM } from '../model/fcm';
import logger from '../config/logger';

const fcm = new _FCM(SERVER_KEY);

async function registerUser(req, res) {
  const { token } = _.pick(req.body, ['token']);
  const uid = getFCMToken(token);

  try {
    await new FCM({ uid, token }).add();
    return res.json({ message: 'SUCCESS', uid });
  } catch (err) {
    logger.error('[controller/fcm]', err);
    return res.status(500).json({ message: 'SERVER_ERROR' });
  }
}

const getFCMToken = token => `${moment().format('MMDDss')}${token.substring(3, 7)}`;

async function sendEmer(req, res) {
  const { uid } = _.pick(req.body, ['uid']);

  try {
    const fcms = await FCM.findManyTokensWithUid(uid);

    fcms.forEach(_fcm => {
      const message = {
        to: _fcm.token,
        notification: {
          title: 'Emergency',
          body: '제가 위험에 빠졌어요. GPS와 사진을 보고 저를 구해주세요!',
          sound: 'default',
          icon: 'ic_launcher'
        }
      };

      fcm.send(message, (err, response) => {
        if (err) {
          logger.error('[controller/sendEmer]', err);
          return res.status(500).json({ message: 'SERVER_ERROR' });
        }

        return res.json({ message: 'SUCCESS' });
      });
    });
  } catch (err) {
    logger.error('[controller/sendEmer]', err);
    console.error(err);
    return res.status(500).json({ message: 'SERVER_ERROR' });
  }
}

module.exports = {
  registerUser,
  sendEmer
};
