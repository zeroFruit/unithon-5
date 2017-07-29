import _ from 'lodash';
import { Schema } from 'mongoose';
import { mongoose } from '../config/mongodb';
import logger from '../config/logger';

const UserSchema = new mongoose.Schema({
  uid: { type: String },
  profileId: { type: String }
});

UserSchema.methods.add = function() {
  const user = this;

  return new Promise((resolve, reject) => user.save()
    .then(() => resolve(user))
    .catch(err => {
      logger.error('[model/add], err');
      reject(err);
    })
  );
};

UserSchema.statics.getVoiceIdWithUid = function(uid) {
  const User = this;

  return User.findOne({ uid }).then(user => user.voiceId);
};

UserSchema.statics.findByUid = function(uid) {
  const User = this;

  try {
    return User.find({ uid }).limit(1);
  } catch (e) {
    logger.error(e);
    return Promise.reject();
  }
};

UserSchema.statics.addAlbum = function(uid, album) {
  const User = this;

  return User.find({ uid }).limit(1).then(user => {
    user[0].albums.push(album);
    return user[0].save();
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
