import { Router } from 'express';
import * as usersCtrl from '../controllers/getUsers';

const router = Router();

// <<PLAIN USERS ROUTES>>


router.get('/', usersCtrl.getUsers);
router.get('/:id', usersCtrl.getUser);
router.delete('/:id', usersCtrl.deleteUser);
router.put('/:id', usersCtrl.updateUser);
// router.post('/:id', usersCtrl.updateUser);


export default router;
