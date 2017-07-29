import './config/env/env';

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { mongoose } from './config/mongodb';
import logger from './config/logger';
import Router from './router';

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.env;

app.use(bodyParser.json());
app.use(cors());

Router(app);

app.listen(port, () => {
  logger.log('info', `env: ${env}, port: ${port}`);
});

module.exports = { app };
