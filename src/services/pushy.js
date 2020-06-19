import axios from 'axios';

const secretApiKey = process.env.PUSHY_SECRET_API_KEY;

const sendPush = async (to, data) => {
  try {
    // Send Push
    const url = `https://api.pushy.me/push?api_key=${secretApiKey}`;
    const body = { to, data };

    const response = await axios.post(url, body);
    const { data: responseData } = response;

    return Promise.resolve(responseData);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  sendPush,
};
