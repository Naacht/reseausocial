const { Post } = require('../../models/postModel');

const deletePost = async (req, res) => {
  try {
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }

    const postId = req.params.postId;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    if (post.userId !== req.session.user_id) {
      return res.status(403).json({ message: 'Vous n\'avez pas la permission de supprimer ce post' });
    }
    
    await post.destroy();

    res.status(200).json({ message: 'Post supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = deletePost;
