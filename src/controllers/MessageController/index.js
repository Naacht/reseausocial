const deleteMessage = require('./deleteMessage');
const receiveMessage = require('./receiveMessage');
const sendMessage = require('./sendMessage');

const MessageController = {
    deleteMessage, receiveMessage, sendMessage,
};

module.exports = MessageController;
