const { Message } = require('../../models/messageModel');

const receiveMessage = async (req, res) => {
  const { userId } = req.params;

  try {
    // Trouver tous les messages destinés à l'utilisateur spécifié
    const messages = await Message.findAll({
      where: { receiverId: userId },
      order: [['createdAt', 'DESC']] // trie les messages par date de création décroissante
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching received messages:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = receiveMessage;

