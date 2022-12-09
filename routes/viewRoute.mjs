import { Router } from 'express';

import * as viewController from '../controllers/viewController.mjs';

const router = Router();

router.get('/register', viewController.renderRegister);
router.get('/login', viewController.renderLogin);

router.get('/:slug', viewController.renderLinks);

export default router;
