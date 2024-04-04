const { User, scheduleUserDeletion } = require('../../models/userModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const sendEmail = require('../../controllers/EmailController/sendEmail');
const verificationCode = require('../../helpers/verificationCode');

// Define a function to check if the file type is an image
const isImage = (file) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  return allowedMimeTypes.includes(file.mimetype);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  },
});

const fileFilter = (req, file, cb) => {
  if (isImage(file)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Format d\'email invalide' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ message: 'Ce nom d\'utilisateur est déjà pris' });
    }

    // Generate a verification code
    const userVerificationCode = verificationCode;

    // Hasher le mot de passe
    const hashPassword = await bcrypt.hash(password, 10);

    let profilePicture = req.file ? req.file.path : null;

    if (!profilePicture) {
      profilePicture = 'public/photo.jpg';
    }

    // Créer un nouvel utilisateur
    const newUser = await User.create({
      username,
      email,
      hash_password: hashPassword,
      profile_picture: profilePicture,
      verification_code: userVerificationCode,
    });

    sendEmail(email, userVerificationCode);
    scheduleUserDeletion(newUser);


    res.status(201).json({ message: 'Utilisateur créé avec succès' });
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
    register(req, res);
  });
};
