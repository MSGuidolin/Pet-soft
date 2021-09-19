import { Router } from 'express';
import { checkoutController } from '../controllers/checkout.controller'

const router = Router();

router.get('/:id', checkoutController);

export default router;
