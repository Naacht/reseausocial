const sendFriendRequest = require('./sendFriendRequest');
const acceptFriendRequest = require('./acceptFriendRequest');
const rejectFriendRequest = require('./rejectFriendRequest');
const deleteFriend = require('./deleteFriend');
const getUserFriends = require('./getUserFriends');
const getSessionFriends = require('./getSessionFriends');
const checkFriendRequest = require('./checkFriendRequest');
const getFriendRequest = require('./getFriendRequest');

const FriendController = {
    sendFriendRequest, acceptFriendRequest, rejectFriendRequest, deleteFriend, getUserFriends, getSessionFriends, getFriendRequest, checkFriendRequest
};

module.exports = FriendController;
