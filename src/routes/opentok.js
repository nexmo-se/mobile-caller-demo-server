import express from 'express';

import deviceService from '../services/device';
import opentokService from '../services/opentok';
import pushyService from '../services/pushy';

const router = express.Router();

router.get('/', (_, res) => res.send('push'));

router.post('/createSession', async (req, res) => {
  try {
    // Create Session
    const { apiKey, sessionId } = await opentokService.createSession();

    // Get Token
    const token = await opentokService.getToken(sessionId);

    // Respond to Caller
    res.json({ apiKey, sessionId, token });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post('/notifyCallee', async (req, res) => {
  try {
    const { from, to, sessionId } = req.body;

    // API Key
    const apiKey = opentokService.getApiKey();

    // Get Token
    const token = await opentokService.getToken(sessionId);

    // Push to Callee
    const pushToken = await deviceService.getToken(to);
    pushyService.sendPush(pushToken, {
      action: 'ACTION_INCOMING_CALL', from, apiKey, sessionId, token,
    })
      .then(() => console.log('Pushed to Device'))
      .catch(error => console.error(error));

    // Respond to Caller
    res.send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post('/call', async (req, res) => {
  try {
    const { from, to } = req.body;

    console.log(`From: ${from}`);
    console.log(`To: ${to}`);

    // Create Session
    const { apiKey, sessionId } = await opentokService.createSession();

    // Get Token1 (from) and Token2 (to)
    const token1 = await opentokService.getToken(sessionId);
    const token2 = await opentokService.getToken(sessionId);

    // Push to Callee
    const pushToken = await deviceService.getToken(to);
    pushyService.sendPush(pushToken, {
      action: 'ACTION_INCOMING_CALL', from, apiKey, sessionId, token: token2,
    })
      .then(() => console.log('Pushed to Device'))
      .catch(error => console.error(error));

    // Respond to Caller
    res.json({ apiKey, sessionId, token: token1 });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post('/reject', async (req, res) => {
  try {
    const { to } = req.body;

    // Push to Callee
    const pushToken = await deviceService.getToken(to);
    pushyService.sendPush(pushToken, { action: 'ACTION_REJECT_CALL' })
      .then(() => console.log('Pushed to Device'))
      .catch(error => console.error(error));

    // Respond to Caller
    res.send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

router.post('/answer', async (req, res) => {
  try {
    const { to } = req.body;

    // Push to Callee
    const pushToken = await deviceService.getToken(to);
    pushyService.sendPush(pushToken, { action: 'ACTION_ANSWER_CALL' })
      .then(() => console.log('Pushed to Device'))
      .catch(error => console.error(error));

    // Respond to Caller
    res.send('ok');
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export default router;
