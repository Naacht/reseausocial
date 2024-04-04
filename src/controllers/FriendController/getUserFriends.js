const { Friend } = require('../../models/friendModel');
const { User } = require('../../models/userModel');
const { Op } = require('sequelize');

const getUserFriends = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all friends with 'accepted' status for the given user
    const userFriends = await Friend.findAll({
      where: {
        [Op.or]: [
          { user_id: userId, status: 'accepted' },
          { friend_id: userId, status: 'accepted' },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: ['id', 'username'] },
        { model: User, as: 'friend', attributes: ['id', 'username'] },
      ],
    });

    res.status(200).json({ userFriends });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = getUserFriends;
