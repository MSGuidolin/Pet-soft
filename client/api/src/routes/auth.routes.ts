import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller';
import upload from '../libs/multer';

const router = Router();

router.post('/signup', upload.single('image'), authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

export default router;
