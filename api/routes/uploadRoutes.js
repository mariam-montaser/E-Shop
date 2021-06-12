import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.log('Uploads: ', req);
    cb(null, '/uploads/');
  },
  filename (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
});

function checkFileType (file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = filetypes.test(file.mimeType)
  if(extname && mimeType) {
    return cb(null, true);
  } else {
    cb('Images Only!.')
  }
}

const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
})

router.post('/', upload.single('image'), (req, res) => {
  console.log('Path: ', req.body);
  res.send(`/${req.file.path}`);
})

export default router;
