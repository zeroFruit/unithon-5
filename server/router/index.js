import Controller from '../controller';

module.exports = app => {
  app.get('/', Controller.Helloworld);
};
