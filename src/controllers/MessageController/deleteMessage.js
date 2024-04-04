const { Message } = require('../../models/messageModel');

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  try {
    // Trouver le message à supprimer dans la base de données
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message introuvable' });
    }

    // Supprimer le message de la base de données
    await message.destroy();

    return res.status(200).json({ message: 'Message supprimé' });
  } catch (error) {
    console.error('Erreur de suppression:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = deleteMessage;

