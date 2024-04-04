const { Message } = require('../../models/messageModel');

const sendMessage = async (req, res) => {
  // Vérifier si l'utilisateur est connecté en utilisant les informations stockées dans la session
  if (!req.session || !req.session.user_id) {
    return res.status(401).json({ message: 'Utilisateur non connecté' });
  }

  const senderId = req.session.user_id;
  const { receiverId, content } = req.body;

  try {
    // Créer un nouveau message dans la base de données
    const message = await Message.create({
      senderId,
      receiverId,
      content
    });

    return res.status(201).json({ message: 'Message envoyé avec succès', data: message });
  } catch (error) {
    console.error('Le message n\'a pas pu être envoyé:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = sendMessage;
