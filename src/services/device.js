import { v4 as uuid } from 'uuid';

import databaseService from './database';

const listTokens = async () => {
  try {
    const { Device } = databaseService;

    // Select
    const tokens = await Device.findAll({});
    const mappedTokens = tokens.map(token => token.dataValues.pushyToken);

    return Promise.resolve(mappedTokens);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getToken = async (mobileNumber) => {
  try {
    const { Device } = databaseService;

    // Select
    const criteria = { where: { mobileNumber } };
    const token = await Device.findOne(criteria);
    const mappedToken = token.dataValues.pushyToken;

    return Promise.resolve(mappedToken);
  } catch (error) {
    return Promise.reject(error);
  }
};

const setToken = async (mobileNumber, token) => {
  try {
    const { Device } = databaseService;

    // Clear Existing
    const criteria = { where: { mobileNumber } };
    await Device.destroy(criteria);

    // Add New
    const data = {
      id: uuid(),
      mobileNumber,
      pushyToken: token,
    };
    const phone = await Device.create(data);
    const mappedPhone = phone.dataValues;

    return Promise.resolve(mappedPhone.id);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  listTokens,
  getToken,
  setToken,
};
