const { Like } = require('../../models/likeModel');
const { Post } = require('../../models/postModel');
const { User } = require('../../models/userModel');

const likePost = async (req, res) => {
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

    const existingLike = await Like.findOne({
      where: { postId, userId },
    });

    if (existingLike) {
      return res.status(400).json({ message: 'Vous avez déjà aimé ce post' });
    }

    const newLike = await Like.create({ postId, userId });

    res.status(201).json({ message: 'Like ajouté avec succès', like: newLike });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = likePost;
