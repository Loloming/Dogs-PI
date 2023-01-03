const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('temp', {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
  });
};
