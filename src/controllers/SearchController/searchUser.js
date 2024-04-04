const { User, sequelize } = require('../../models/userModel');
const { Op } = require('sequelize');

const searchUser = async (req, res) => {
  const { username } = req.query;

  try {
    // Rechercher les utilisateurs par leur username
    const users = await User.findAll({
      attributes: ['id', 'username'],
      where: {
        username: {
          [Op.like]: `%${username}%`
        }
      }
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = searchUser;
