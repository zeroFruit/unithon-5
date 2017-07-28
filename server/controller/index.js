import '../config/env/env';
import { responseByCode } from '../helpers';

const Helloworld = (req, res) => {
  const SUCCESS_MESSAGE = 'SUCCESS_MESSAGE';
  res.status(200).json({ message: SUCCESS_MESSAGE });
};

module.exports = {
  Helloworld
};
