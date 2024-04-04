const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'reseausocialCCF@gmail.com',
        pass: '',
    },
});

module.exports = transporter;
