import express from 'express';

import deviceService from '../services/device';
import pushyService from '../services/pushy';

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    // List Token
    const tokens = await deviceService.listTokens() || [];
    console.log(`Listed Mobile Token - ${tokens.length} tokens`);

    res.json(tokens);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

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

router.post('/:mobileNumber/unregister', async (req, res) => {
  try {
    const { mobileNumber } = req.params;

    // Clear Token
    await deviceService.clearToken(mobileNumber);
    console.log(`Cleared Mobile Token for ${mobileNumber}`);

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
