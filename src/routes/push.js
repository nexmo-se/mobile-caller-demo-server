import express from 'express';

import deviceService from '../services/device';
import pushyService from '../services/pushy';

const router = express.Router();

router.get('/', (_, res) => res.send('push'));

router.post('/:mobileNumber/register', async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const { token } = req.body;

    // Set Token
    const id = await deviceService.setToken(mobileNumber, token);
    console.log(`Saved Mobile Token for ${mobileNumber} (${id})`);

    res.send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post('/:mobileNumber/push', async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const data = req.body;

    // Get Token
    const token = await deviceService.getToken(mobileNumber);

    // Push to Device
    const responseData = await pushyService.sendPush(token, data);
    console.log(`Sent Push to Mobile - ${responseData}`);

    res.send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export default router;
