import AlbumController from '../controller/album';
import TextController from '../controller/translate';
import VoiceController from '../controller/voice';

module.exports = app => {
  app.post('/analysis2',
    AlbumController.addAlbumMiddleware,
    AlbumController.analyzeImgMiddleware,
    TextController.translateTextEndPoint
  );
};
