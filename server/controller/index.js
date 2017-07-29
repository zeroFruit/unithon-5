import '../config/env/env';
import _ from 'lodash';
import logger from '../config/logger';

import { User } from '../model/user';

function addUser(req, res) {
  if (!req.body.uid || !req.body.voiceId) {
    logger.error('[controller/index]', '파라미터가 부족합니다.');
    return res.status(400).json({ message: 'INSUFFICIENT_PARAMS' });
  }

  const user = _.pick(req.body, ['uid', 'voiceId']); // { uid: '' }

  new User(user).add()
    .then(user => res.json({ message: 'SUCCESS' }))
    .catch(err => {
      logger.error('[controller/index]', err);
      return res.status(500).json({ message: 'SERVER_ERROR' });
    });
}

async function loginUser(req, res) {
  if (!req.body.uid || !req.body.voiceId) {
    logger.error('[controller/index]', '파라미터가 부족합니다.');
    return res.status(400).json({ message: 'INSUFFICIENT_PARAMS' });
  }
}

module.exports = {
  addUser,
  loginUser
};
