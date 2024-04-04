const { DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/connectionDB');

const Friend = sequelize.define('Friend', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  friend_id: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
    allowNull: false,
    validate: {
      isIn: [['pending', 'accepted', 'rejected']],
    },
  },
}, {
  timestamps: false,
  hooks: {
    // Before updating a record, check if the status is 'rejected' and delete the record
    beforeUpdate: (friend, options) => {
      if (friend.status === 'rejected') {
        return Friend.destroy({ where: { id: friend.id } });
      }
    },
  },
});

module.exports = { Friend };