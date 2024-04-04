const { Router } = require('express');
const MessageController = require('../controllers/MessageController');

const messageRouter = Router();

messageRouter.post('/send', MessageController.sendMessage);
messageRouter.delete('/delete/:messageId', MessageController.deleteMessage);
messageRouter.get('/receive/:userId', MessageController.receiveMessage);

module.exports = messageRouter;


