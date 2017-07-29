import _ from 'lodash';
import { SERVER_KEY } from '../config/FCMPush';
import moment from 'moment';
import _FCM from 'fcm-node';
import { FCM } from '../model/fcm';
import logger from '../config/logger';
var apn = require('apn');

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


      var apnProvider = new apn.Provider({

           token: {

              key: './keys/Key.p8',
              // authKey를 확인해보면 keyId가 존재한다.
              keyId: '32VMD8SH74',
              // https://developer.apple.com/account/#/membership/ 에서 팀아이디를 확인할 수 있다.
              teamId: 'AANGG4Q668',
          },
          //production 인지  develop인지 판단하는 부분이다.
          production: true // Set to true if sending a notification to a production iOS app
      });

      //위에서 발급받은 디바이스토큰을 입력한다.
      var deviceToken = _fcm.token;


      var notification = new apn.Notification();

      //내앱의 번들 id를 입력하면된다.
      notification.topic = 'vivid.BlinderSafer.unithon1';

      // 푸시를 만기시간이다 얼마만큼의 시간동안 보유할지에 대한이야기다.
      // apns는 storeForward 방식을 사용하고 만약 단말기가 꺼져있다면 단말기가 온라인 될때 알림을 전달한다.
      // expirytime 이 지나게되면 해당  알림을 지운다.
      notification.expiry = Math.floor(Date.now() / 1000) + 3600;

      //뱃지 수를 의미한다
      notification.badge = 3;

      //플레이 사운드를 의미한다
      notification.sound = 'ping.aiff';

      //알랏 문구를 의미한다.
      notification.alert = '제가 지금 위험합니다. 도와주세요. \u270C';

      //디바이스에 전달할 내부 페이로드다.
      didReceiveRemoteNotification
      notification.payload = {id: 123};

      //실제 보내지고 result에 다양한 정보가 찍힌다.
      apnProvider.send(notification, deviceToken).then(function(result) {
          console.log(result);
          console.log(result['failed'][0]['response']);
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
