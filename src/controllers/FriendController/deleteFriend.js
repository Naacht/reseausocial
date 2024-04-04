const { Friend } = require('../../models/friendModel');
const { Op } = require('sequelize');

const deleteFriend = async (req, res) => {
  // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  const userId = req.session.user_id;
  const { friendId } = req.body;

  try {
    // Find the friend relationship with 'accepted' status
    const friendRelationship = await Friend.findOne({
      where: {
        [Op.or]: [
          { user_id: userId, friend_id: friendId },
          { user_id: friendId, friend_id: userId },
        ],
      },
    });

    if (!friendRelationship) {
      return res.status(404).json({ message: 'Friend relationship not found.' });
    }

    // Delete the friend relationship
    await friendRelationship.destroy();

    res.status(200).json({ message: 'Friend deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = deleteFriend;
