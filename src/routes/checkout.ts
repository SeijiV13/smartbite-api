import { CheckoutController } from './../controllers/CheckoutController';
import { Router } from 'express';



const router = Router();

router.post('/', CheckoutController.checkoutCredits);


export default router;