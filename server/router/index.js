import multer from 'multer';
import AlbumController from '../controller/album';
import TextController from '../controller/translate';
import VoiceController from '../controller/voice';
import MulterMiddleware from '../middlewares/multer';

module.exports = app => {
  app.post('/analysis2',
    MulterMiddleware,
    AlbumController.addAlbumMiddleware,
    AlbumController.analyzeImgMiddleware,
    TextController.translateTextEndPoint
  );
};
