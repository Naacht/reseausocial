const { Friend } = require('../../models/friendModel');
const { Op } = require('sequelize');

const checkFriendRequest = async (req, res) => {
  // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  const userId = req.session.user_id;
  const friendId = req.params.userId;

  try {
    // Vérifier si une demande d'ami existe
    const friendRequestSent = await Friend.findOne({
      where: {
        [Op.or]: [
          { user_id: userId, friend_id: friendId },
          { user_id: friendId, friend_id: userId },
        ],
      },
    });

    // Envoyer l'état de la demande d'ami
    res.status(200).json({ friendRequestSent: !!friendRequestSent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = checkFriendRequest;