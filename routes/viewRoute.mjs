import { Router } from 'express';

import * as viewController from '../controllers/viewController.mjs';

const router = Router();

router.get('/:slug', viewController.renderLinks);

export default router;
