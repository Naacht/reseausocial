const { Friend } = require('../../models/friendModel');

const rejectFriendRequest = async (req, res) => {
  // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  const userId = req.session.user_id;
  const { friendId } = req.body;

  try {
    // Find and update the friend request status to 'rejected'
    const friendRequest = await Friend.findOne({
      where: {
        user_id: friendId,
        friend_id: userId,
        status: ['pending', 'accepted'],
      },
    });

    if (!friendRequest) {
      return res.status(404).json({ message: 'Friend request not found.' });
    }

    await friendRequest.update({ status: 'rejected' });

    res.status(200).json({ message: 'Friend request rejected successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = rejectFriendRequest;
