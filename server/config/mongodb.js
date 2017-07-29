import './env/env';
import mongoose from 'mongoose';
import logger from './logger';

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true })
  .then(() => {
    logger.info('mongodb has been connected');
  })
  .catch(err => {
    logger.error('error while trying to connect with mongodb');
    logger.error(err);
  });

module.exports = { mongoose };
