import AlbumController from '../controller/album';
import TextController from '../controller/translate';
import FCMController from '../controller/fcm';

module.exports = app => {
  app.post('/analysis2',
    AlbumController.addAlbumMiddleware,
    AlbumController.analyzeImgMiddleware,
    TextController.translateTextEndPoint
  );
  app.post('/album', AlbumController.addAlbum);
  app.get('/albums', AlbumController.getAlbums);

  app.post('/fcm', FCMController.registerUser);
  app.post('/fcm/alarm', FCMController.sendEmer);
};
