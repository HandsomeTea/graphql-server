import express from 'express';
import test from './test';

const router = express.Router();

/** /api/v1 */
router.use(test);

export default router;
