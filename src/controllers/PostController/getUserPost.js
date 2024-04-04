const { Like } = require('../../models/likeModel');
const { Post } = require('../../models/postModel');
const { User } = require('../../models/userModel'); // Ajout du modèle User
const { sequelize } = require('../../helpers/connectionDB.js');
const { Interest } = require('../../models/interestModel.js');

const getUserPost = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur depuis la requête
    const userId = req.params.userId;

    // Récupérer tous les posts avec le compteur de likes pour un utilisateur spécifique
    const posts = await Post.findAll({
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
          where: {
            id: userId, // Filtrer par l'ID de l'utilisateur
          },
        },
        {
          model: Interest,
          attributes: ['id', 'name'],
        },
      ],
      where: {
        userId: userId, // Filtrer par l'ID de l'utilisateur
      },
      group: ['Post.id'], // Groupement par ID de post pour compter les likes correctement
    });

    res.status(200).json({ message: 'Liste de posts de l\'utilisateur récupérée avec succès', posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = getUserPost;