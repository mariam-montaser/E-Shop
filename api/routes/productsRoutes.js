import express from 'express';

import { deleteProduct, getProductById, getProducts, updateProduct, createProduct, createReview, getTopProducts} from '../controllers/productControllers.js';
import {protect, admin} from '../middleware/auth.js';

const router = express.Router();


router.route('/').get( getProducts).post(protect, admin,createProduct);
router.route('/:id/reviews').post(protect, createReview);
router.route('/top').get(getTopProducts);
router.route('/:id').get( getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct);

// router.get('/', getProducts);
// router.get('/:id', getProductById);

export default router;