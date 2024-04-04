const createPost = require('./createPost');
const likePost = require('./likePost');
const commentPost = require('./commentPost');
const deletePost = require('./deletePost');
const removeLike = require('./removeLike');
const removeComment = require('./removeComment');
const getAllPost = require('./getAllPost');
const getPost = require('./getPost');
const getAllInterestPost = require('./getAllInterestPost');
const getPostComment = require('./getPostComment');
const checkLikeStatus = require('./checkLikeStatus');
const getUserPost = require('./getUserPost');

const PostController = {
    createPost, likePost, commentPost, deletePost, removeLike, removeComment, getAllPost, getPost, getAllInterestPost, getPostComment, checkLikeStatus, getUserPost
}

module.exports = PostController;