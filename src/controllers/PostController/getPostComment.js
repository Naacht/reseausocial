const { Comment } = require('../../models/commentModel');
const { Post } = require('../../models/postModel');
const { User } = require('../../models/userModel');

const getPostComment = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    // Fetch all comments for the specified post
    const comments = await Comment.findAll({
      where: { postId },
      include: [
        // Include any associations you need, for example, include the user who made the comment
        { model: User, attributes: ['id', 'username', 'profile_picture'] },
      ],
    });

    // Respond with the comments
    res.status(200).json({ comments });
  } catch (error) {
    // Handle errors and respond with an internal server error
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Export the getCommentsForPost function
module.exports = getPostComment;
