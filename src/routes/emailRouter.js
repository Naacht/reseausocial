const { Router } = require('express');
const EmailController = require('../controllers/EmailController');

const emailRouter = Router();

emailRouter.post('/sendEmail', EmailController.sendEmail);

module.exports = emailRouter;
