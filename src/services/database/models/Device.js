module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
    },
    mobileNumber: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    pushyToken: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Device.associate = (models) => {
    // associations can be defined here
  };

  return Device;
};
