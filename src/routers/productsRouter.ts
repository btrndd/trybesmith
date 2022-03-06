import { Router } from 'express';
import productController from '../controllers/productController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
router.post('/', authMiddleware.auth, productController.create);

export default router;