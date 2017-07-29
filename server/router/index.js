import AlbumController from '../controller/album';

module.exports = app => {
  app.post('/analysis', AlbumController.analyzeImg);
  app.post('/album', AlbumController.addAlbum);
};
