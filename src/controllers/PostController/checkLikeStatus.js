// Assuming you have a Like model and Post model
const { Like } = require('../../models/likeModel');
const { Op } = require('sequelize');

const checkLikeStatus = async (req, res) => {
  // Check if the user is logged in
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'User not logged in' });
  }

  const userId = req.session.user_id;
  const postId = req.params.postId;

  try {
    // Check if the user has liked the post
    const liked = await Like.findOne({
      where: {
        userId: userId,
        postId: postId,
      },
    });

    // Send the like status
    res.status(200).json({ liked: !!liked });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = checkLikeStatus;
