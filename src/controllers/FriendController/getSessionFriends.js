const { Friend } = require('../../models/friendModel');
const { User } = require('../../models/userModel');
const { Op } = require('sequelize');

const getSessionFriends = async (req, res) => {
  // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  try {
    const userId = req.session.user_id;

    // Find all friends with 'accepted' status for the given user
    const sessionFriends = await Friend.findAll({
      where: {
        [Op.or]: [
          { friend_id: userId },
          { user_id: userId },
        ],
        status: 'accepted',
      },
      include: [
        { model: User, as: 'user', attributes: ['id', 'username'] },
      ],
    });

    res.status(200).json({ sessionFriends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = getSessionFriends;