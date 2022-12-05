import { Router } from 'express';

import * as userController from '../controllers/userController.mjs';
import * as authController from '../controllers/authController.mjs';

const router = Router();

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

router.post('/login', authController.loginUser);

export default router;
