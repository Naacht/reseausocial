const { DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/connectionDB');

const Post = sequelize.define('Post', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interestId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { Post };