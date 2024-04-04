const { Comment } = require('../../models/commentModel');

// Define the removeComment function
const removeComment = async (req, res) => {
  try {
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }

    const userId = req.session.user_id;
    const commentId = req.params.commentId;

    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce commentaire' });
    }

    await Comment.destroy({ where: { id: commentId } });

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = removeComment;
