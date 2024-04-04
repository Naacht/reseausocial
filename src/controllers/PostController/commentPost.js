const { Comment } = require('../../models/commentModel');
const { User } = require('../../models/userModel');
const { Post } = require('../../models/postModel');

// Define the commentPost function
const commentPost = async (req, res) => {
  try {
    // Check user authentication and extract necessary information from the request
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }

    const userId = req.session.user_id;
    const postId = req.params.postId;
    const { text } = req.body; // Assuming your request body has a 'text' property

    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Create a new comment
    const newComment = await Comment.create({ text, userId, postId });

    // Respond with success message and the new comment
    res.status(201).json({ message: 'Commentaire ajouté avec succès', comment: newComment });
  } catch (error) {
    // Handle errors and respond with an internal server error
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Export the commentPost function
module.exports = commentPost;
