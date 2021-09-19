import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';

const storage = multer.diskStorage({
  //destination: 'uploads', // donde guarda
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    // EN CASO DE QUE NO SIRVA EL REQ.FILE
    // let filename = uuid() + path.extname(file.originalname);
    // req.body.file = filename;
    // cb(null, filename);

    //REQ.FILE FUNCIONANDO
    cb(null, uuid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
export default upload;
