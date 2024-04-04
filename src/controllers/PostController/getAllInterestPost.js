const { Like } = require('../../models/likeModel');
const { Post } = require('../../models/postModel');
const { User } = require('../../models/userModel');
const { sequelize } = require('../../helpers/connectionDB.js');
const { Interest } = require('../../models/interestModel.js');

const getAllInterestPost = async (req, res) => {
  try {
    // Récupérer l'ID du centre d'intérêt depuis la requête
    const interestId = req.params.interestId;

    // Récupérer tous les posts avec le compteur de likes pour un centre d'intérêt spécifique
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
          attributes: ['id', 'username', 'email', 'profile_picture' ],
        },
        {
          model: Interest,
          attributes: ['id', 'name'],
        },
      ],
      where: {
        interestId: interestId,
      },
      group: ['Post.id'], // Groupement par ID de post pour compter les likes correctement
    });

    res.status(200).json({ message: 'Liste de posts récupérée avec succès', posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = getAllInterestPost;
