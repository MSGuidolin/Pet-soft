import { Router } from 'express';
import * as usersCtrl from '../controllers/getUsers';
import {
  getAllAddresses,
  getOneAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/addresses';

const router = Router();

// <<PLAIN USERS ROUTES>>


router.get('/', usersCtrl.getUsers);
router.get('/:id', usersCtrl.getUser);
router.get('/google/:id', usersCtrl.getUserGoogle);
router.delete('/:id', usersCtrl.deleteUser);
router.put('/:id', usersCtrl.updateUser);
// router.post('/:id', usersCtrl.updateUser);

// router.put('/assignService/:id', usersCtrl.assignService);
// router.put('/removeService/:id', usersCtrl.removeService);


// <<Routes to users' addresses>>
router.get('/:id/addresses', getAllAddresses);
router.get('/:id/addresses/:idAd', getOneAddress);
router.post('/:id/addresses', createAddress);
router.put('/:id/addresses/:idAd', updateAddress);
router.delete('/:id/addresses/:idAd', deleteAddress);

export default router;
