const { Post } = require('../../models/postModel');
const { User } = require('../../models/userModel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/'); // Set the destination folder for post images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'post-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  },
});

const fileFilter = (req, file, cb) => {
  // Modify this based on your image file requirements
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const createPost = async (req, res) => {
  try {
    // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
    if (!req.session || !req.session.user_id) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }

    const userId = req.session.user_id;

    // Vérifier si l'utilisateur existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Extract post data from the request body
    const { content, interestId } = req.body;

    // Handle image upload
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.path;
    }

    // Créer un nouveau post avec l'ID de l'utilisateur connecté et l'URL de l'image
    const newPost = await Post.create({ content, userId, interestId, imageUrl });

    res.status(201).json({ message: 'Post créé avec succès', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

module.exports = (req, res) => {
  upload.single('profilePicture')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors du traitement du fichier' });
    }
    createPost(req, res);
  });
};