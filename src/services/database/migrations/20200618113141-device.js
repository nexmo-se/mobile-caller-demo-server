module.exports = {
  up: (queryInterface, Sequelize) => {
    const createDeviceTable = () => queryInterface.createTable('Devices', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        primaryKey: true,
      },
      mobileNumber: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      pushyToken: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    return Promise.resolve()
      .then(createDeviceTable);
  },
  down: (queryInterface) => {
    const dropDeviceTable = () => queryInterface.dropTable('Devices');

    return Promise.resolve()
      .then(dropDeviceTable);
  },
};
