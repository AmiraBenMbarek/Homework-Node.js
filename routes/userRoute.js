import express from 'express';
import multer from '../middleware/avatar.js';

import { authenticate, createUser, updateProfile } from '../controllers/userController.js';
const router = express.Router();

router.route('/authenticate').post(authenticate);
router.route('/createUser').post(multer, createUser);
router.route('/updateProfile/:id').put(multer, updateProfile);

export default router;