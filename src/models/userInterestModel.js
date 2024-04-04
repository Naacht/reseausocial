const { DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/connectionDB');

const UserInterest = sequelize.define('UserInterest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  timestamps: false,
});

module.exports = { UserInterest };