const { Router } = require('express');
const InterestController = require('../controllers/InterestController');

const interestRouter = Router();

interestRouter.get('/getAllInterest', InterestController.getAllInterest);
interestRouter.post('/selectInterest', InterestController.selectInterest);
interestRouter.get('/getUserInterest/:userId', InterestController.getUserInterest);
interestRouter.delete('/deleteInterest/:interestId', InterestController.deleteInterest);

module.exports = interestRouter;
