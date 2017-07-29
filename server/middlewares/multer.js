// import multer from 'multer';
// import logger from '../config/logger';
//
// const upload = multer({ dest: 'upload/' });
//
// function getUid(req, res, next) {
//   upload(req, res, err => {
//     if (err) {
//       console.log(err);
//       logger.error('[middlewares/multer]');
//       return res.status(500).json({ message: 'SERVER_ERROR' });
//     }
//
//     console.log('req.body', req.body);
//     logger.info('[middlewares/multer] SUCCESS');
//     next();
//   });
// }
//
// module.exports = { getUid };
