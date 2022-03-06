import { Router } from 'express';
import orderController from '../controllers/orderController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
router.post('/', authMiddleware.auth, orderController.create);

export default router;