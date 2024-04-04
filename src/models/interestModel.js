const { DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/connectionDB');

const Interest = sequelize.define('Interest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = { Interest };
