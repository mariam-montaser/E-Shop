import express from 'express';

import { authUser, deleteUser, getUserById, getUserProfile, getUsers, registerUser, updateUser, updateUserProfile } from '../controllers/userControllers.js';

import {protect, admin} from '../middleware/auth.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser);

// router.get('/profile',protect, getUserProfile)
// router.post('/register', registerUser);

export default router;