const { Router } = require('express');
const ReportController = require('../controllers/ReportController');

const reportRouter = Router();

reportRouter.post('/reportUser', ReportController.createUserReport);
reportRouter.post('/reportPost', ReportController.createPostReport);
reportRouter.get('/getAllReport', ReportController.getAllReport);

module.exports = reportRouter;
