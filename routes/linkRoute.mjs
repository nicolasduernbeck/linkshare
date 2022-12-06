import { Router } from 'express';
import * as authController from '../controllers/authController.mjs';
import * as linkController from '../controllers/linkController.mjs';

const router = Router();

router.route('/').post(authController.protect, linkController.addLink);

export default router;
