const { Friend } = require('../../models/friendModel');
const { Op } = require('sequelize');

const sendFriendRequest = async (req, res) => {
  // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  const userId = req.session.user_id;
  const { friendId } = req.body;

  try {
    // Check if a friend request already exists
    const existingRequest = await Friend.findOne({
      where: {
        [Op.or]: [
          { user_id: userId, friend_id: friendId },
          { user_id: friendId, friend_id: userId },
        ],
      },
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent or exists.' });
    }

    // Create a new friend request
    await Friend.create({
      user_id: userId,
      friend_id: friendId,
    });

    res.status(201).json({ message: 'Friend request sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = sendFriendRequest;

