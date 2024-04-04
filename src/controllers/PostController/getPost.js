const { Like } = require('../../models/likeModel');
const { Post } = require('../../models/postModel');
const { User } = require('../../models/userModel');
const { sequelize } = require('../../helpers/connectionDB.js');

const getPost = async (req, res) => {
  const postId = req.params.postId; // Assuming the post ID is passed as a parameter in the request

  try {
    // Récupérer un post avec le compteur de likes par ID
    const post = await Post.findOne({
      where: { id: postId }, // Add this condition to retrieve a specific post
      attributes: [
        'id',
        'content',
        'createdAt',
        'imageUrl',
        [sequelize.fn('COUNT', sequelize.col('Likes.id')), 'likeCount'],
      ],
      include: [
        {
          model: Like,
          attributes: [],
        },
        {
          model: User,
          attributes: ['id', 'username', 'email', 'profile_picture'],
        },
      ],
      group: ['Post.id'], // Groupement par ID de post pour compter les likes correctement
    });

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    res.status(200).json({ message: 'Post récupéré avec succès', post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = getPost;
