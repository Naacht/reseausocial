const { Router } = require('express');
const SearchController = require('../controllers/SearchController');

const searchRouter = Router();

searchRouter.get('/posts', SearchController.searchPost);
searchRouter.get('/users', SearchController.searchUser);

module.exports = searchRouter;
