const { Friend } = require('../../models/friendModel');
const { User } = require('../../models/userModel');
const { Op } = require('sequelize');

const getFriendRequest = async (req, res) => {
  // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  try {
    const userId = req.session.user_id;

    // Find friend requests where userId is the friend_id
    const friendRequests = await Friend.findAll({
      where: {
        friend_id: userId,
        status: 'pending',
      },
      include: [
        { model: User, as: 'user', attributes: ['id', 'username'] },
      ],
    });

    res.status(200).json({ friendRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = getFriendRequest;
