const createUserReport = require('./createUserReport');
const createPostReport = require('./createPostReport');
const getAllReport = require('./getAllReport');

const ReportController = {
    createUserReport, createPostReport, getAllReport
};

module.exports = ReportController;
