import AlbumController from '../controller/album';
import TextController from '../controller/translate';

module.exports = app => {
  app.post('/analysis', AlbumController.analyzeImg);
  app.post('/album', AlbumController.addAlbum);
  app.post('/translate', TextController.translateText);
  app.post('/analysis2',
    AlbumController.addAlbumMiddleware,
    AlbumController.analyzeImgMiddleware,
    TextController.translateTextEndPoint);
};
