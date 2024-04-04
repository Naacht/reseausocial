const { User } = require('../../models/userModel');
const bcrypt = require('bcrypt');
const multer = require('multer');

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

const modify = async (req, res) => {
  // Vérification de la connexion de l'utilisateur
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  const userId = req.session.user_id;

  const { newUsername, newPassword } = req.body;

  try {
    // Find the user by userId
    const userToUpdate = await User.findByPk(userId);

    // Check if the user exists
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user information if new values are provided
    if (newUsername && newUsername !== userToUpdate.username) {
      const existingUser = await User.findOne({ where: { username: newUsername } });

      if (existingUser) {
        return res.status(400).json({ message: 'Username is already in use' });
      }
    }

    // Update user information if new values are provided
    if (newUsername) {
      userToUpdate.username = newUsername;
    }

    if (newPassword) {
      // Hash the new password
      const hashPassword = await bcrypt.hash(newPassword, 10);
      userToUpdate.hash_password = hashPassword;
    }

    // Handle profile picture update
    if (req.file) {
      // Delete the existing profile picture if it exists
      if (userToUpdate.profile_picture) {
        // Add logic to delete the existing profile picture file (e.g., using fs.unlinkSync)
      }

      // Set the new profile picture path
      userToUpdate.profile_picture = req.file.path;
    }

    // Save the updated user
    await userToUpdate.save();

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = (req, res) => {
  upload.single('profilePicture')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Erreur lors du traitement du fichier' });
    }
    modify(req, res);
  });
};
