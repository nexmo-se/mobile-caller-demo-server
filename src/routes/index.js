import express from 'express';

import pushRouter from './push';
import opentokRouter from './opentok';

const router = express.Router();

router.get('/', (_, res) => res.send('root'));
router.use('/push', pushRouter);
router.use('/opentok', opentokRouter);

export default router;
