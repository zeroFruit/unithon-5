import _ from 'lodash';
import { Schema } from 'mongoose';
import { mongoose } from '../config/mongodb';
import logger from '../config/logger';

const FCMSchema = new mongoose.Schema({
  uid: String,
  token: String
});

FCMSchema.methods.add = function() {
  const fcm = this;

  return new Promise((resolve, reject) => fcm.save()
    .then(() => resolve())
    .catch(err => reject(err))
  );
};

FCMSchema.statics.findManyTokensWithUid = function(uid) {
  const Fcm = this;

  return new Promise((resolve, reject) => Fcm.find({ uid })
    .then(fcms => resolve(fcms))
    .catch(err => reject(err))
  );
};

const FCM = mongoose.model('FCM', FCMSchema);

module.exports = { FCM };
