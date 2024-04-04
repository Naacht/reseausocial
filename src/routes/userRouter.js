const { Router } = require('express');
const UserController = require('../controllers/UserController');

const userRouter = Router();

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.post('/modify', UserController.modify)
userRouter.post('/logout', UserController.logout)
userRouter.post('/validate', UserController.validate)
userRouter.get('/getUser/:userId', UserController.getUser)

module.exports = userRouter;