const { Router } = require('express');
const PostController = require('../controllers/PostController');

const postRouter = Router();

postRouter.post('/create', PostController.createPost);
postRouter.delete('/delete/:postId', PostController.deletePost);
postRouter.post('/:postId/like', PostController.likePost);
postRouter.post('/:postId/comment', PostController.commentPost);
postRouter.delete('/removeLike/:postId', PostController.removeLike);
postRouter.delete('/:postId/removeComment/:commentId', PostController.removeComment);
postRouter.get('/getAllPost', PostController.getAllPost);
postRouter.get('/getPost/:postId', PostController.getPost);
postRouter.get('/getAllInterestPost/:interestId', PostController.getAllInterestPost);
postRouter.get('/comment/:postId', PostController.getPostComment);
postRouter.get('/checkLikeStatus/:postId', PostController.checkLikeStatus);
postRouter.get('/getUserPost/:userId', PostController.getUserPost);

module.exports = postRouter;
