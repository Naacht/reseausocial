const { Router } = require('express');
const friendController = require('../controllers/FriendController');

const friendRouter = Router();

friendRouter.post('/sendRequest', friendController.sendFriendRequest);
friendRouter.post('/acceptRequest', friendController.acceptFriendRequest);
friendRouter.post('/rejectRequest', friendController.rejectFriendRequest);
friendRouter.post('/deleteFriend', friendController.deleteFriend);
friendRouter.get('/userFriends/:userId', friendController.getUserFriends);
friendRouter.get('/sessionFriends', friendController.getSessionFriends);
friendRouter.get('/FriendRequest', friendController.getFriendRequest);
friendRouter.get('/checkFriendRequest/:userId', friendController.checkFriendRequest);

module.exports = friendRouter;
