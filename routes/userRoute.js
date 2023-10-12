import express from 'express';

import { authenticate, createUser, updateProfile } from '../controllers/userController.js';
const router = express.Router();

router.route('/authenticate').post(authenticate);
router.route('/createUser').post(createUser);
router.route('/updateProfile/:id').put(updateProfile);

export default router;