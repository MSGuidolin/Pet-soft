import { Router } from 'express';
import * as usersCtrl from '../controllers/getUsers';
import {
  getAllAddresses,
  getOneAddress,
  createAddress,
  updateAddress,
  deleteAddress,
} from '../controllers/addresses';
import {
  getAllCreditCards,
  getOneCreditCard,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,

} from '../controllers/creditCards';



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

// <<Routes to creditCards>>
router.get('/:id/creditCards', getAllCreditCards);
router.get('/:id/creditCard/:idCC', getOneCreditCard);
router.post('/:id/creditCard', createCreditCard);
router.put('/:id/creditCard/:idCC', updateCreditCard);
router.delete('/:id/creditCard/:idCC', deleteCreditCard);

export default router;
