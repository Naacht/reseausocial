const { Like } = require('../../models/likeModel');
const { Post } = require('../../models/postModel');
const { User } = require('../../models/userModel');

const removeLike = async (req, res) => {
  try {
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }

    const userId = req.session.user_id;
    const postId = req.params.postId;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Find and remove the like based on user and post IDs
    const existingLike = await Like.findOne({
      where: { postId, userId },
    });

    if (!existingLike) {
      return res.status(400).json({ message: 'Like non trouvé ou ne peut pas être supprimé' });
    }

    await existingLike.destroy();

    res.status(200).json({ message: 'Like supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = removeLike;