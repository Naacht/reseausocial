const { DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/connectionDB');

const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  expires: {
    type: DataTypes.DATE,
  },
  data: {
    type: DataTypes.TEXT,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false, // Désactive createdAt et updatedAt (de base obligatoires)
});

module.exports = { Session };
