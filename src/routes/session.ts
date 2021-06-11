import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';



const router = Router();

router.post('/check-session', SessionController.checkSession);
router.get('/get-sessions', SessionController.checkAllSessions);


export default router;