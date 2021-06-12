import express from 'express';
import { addOrderItems, getAllOrders, getOrderById, getUserOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderControllers.js';
import {protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders);
router.route('/userorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;