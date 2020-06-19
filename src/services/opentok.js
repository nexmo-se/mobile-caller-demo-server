import OpenTok from 'opentok';

let otClient = null;

const apiKey = process.env.OT_API_KEY;
const apiSecret = process.env.OT_API_SECRET;

const getClient = () => {
  if (otClient == null) {
    otClient = new OpenTok(apiKey, apiSecret);
  }

  return otClient;
};

const getToken = (sessionId) => {
  const client = getClient(apiKey, apiSecret);
  const token = client.generateToken(sessionId);
  return token;
};

const createSession = () => new Promise((resolve, reject) => {
  const client = getClient(apiKey, apiSecret);
  const options = {
    mediaMode: 'routed',
  };

  client.createSession(options, (error, session) => {
    if (error) {
      reject(error);
    } else {
      const { sessionId } = session;
      resolve({ apiKey, sessionId });
    }
  });
});

export default {
  createSession,
  getToken,
};
