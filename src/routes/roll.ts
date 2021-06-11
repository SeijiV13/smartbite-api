import { Router } from 'express';
import { RollController } from '../controllers/RollController';



const router = Router();

router.post('/roll-slots', RollController.rollSlots);


export default router;