import { Router } from 'express';

import * as userController from '../controllers/userController.mjs';

const router = Router();

router.route('/').post(userController.createUser);

export default router;
