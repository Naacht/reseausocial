const { Post, sequelize } = require('../../models/postModel');
const { Op } = require('sequelize');

const searchPost = async (req, res) => {
  const { keyword } = req.query;

  try {
    // Rechercher les posts par mot clé dans le contenu du post
    const posts = await Post.findAll({
      where: {
        content: {
          [Op.like]: `%${keyword}%`
        }
      }
    });

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = searchPost;
