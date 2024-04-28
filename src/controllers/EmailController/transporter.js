const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: 'SIO2_SLAM@enc-bessieres.org',
        pass: 'Rav40143',
    },
});

module.exports = transporter;
