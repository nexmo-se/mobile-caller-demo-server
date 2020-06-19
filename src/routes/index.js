import express from 'express';

import pushRouter from './push';

const router = express.Router();

router.get('/', (_, res) => res.send('root'));
router.use('/push', pushRouter);

export default router;
