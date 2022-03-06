import { Router } from 'express';
import orderController from '../controllers/orderController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
router.post('/', authMiddleware.auth, orderController.create);
router.get('/:id', authMiddleware.auth, orderController.getById);

export default router;