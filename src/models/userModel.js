const { DataTypes } = require('sequelize');
const { sequelize } = require('../helpers/connectionDB');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_creation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  hash_password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
  },
  profile_picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verification_code: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  validation: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: false,
});

const scheduleUserDeletion = (user) => {
  setTimeout(async () => {
    const foundUser = await User.findByPk(user.id);

    if (foundUser && !foundUser.validation) {
      // Utilisateur non validé après 5 minutes, le supprimer
      await foundUser.destroy();
      console.log(`L'utilisateur ${foundUser.username} a été supprimé car il n'a pas été validé.`);
    }
  }, 5 * 60 * 1000); // 5 minutes en millisecondes
};

module.exports = { User, scheduleUserDeletion };