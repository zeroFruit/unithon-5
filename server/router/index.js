import AlbumController from '../controller/album';
import TextController from '../controller/translate';

module.exports = app => {
  app.post('/analysis2',
    AlbumController.addAlbumMiddleware,
    AlbumController.analyzeImgMiddleware,
    TextController.translateTextEndPoint
  );

  app.post('/album', AlbumController.addAlbum);
};
