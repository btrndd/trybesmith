import { Router } from 'express';
// import { authenticate } from '../controllers/login';
import userController from '../controllers/userController';

const router = Router();

router.post('/', userController.login);

export default router;