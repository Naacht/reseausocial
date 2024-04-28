const transporter = require('../EmailController/transporter'); // Importer la configuration de Nodemailer

const sendEmail = (userEmail, verificationCode) => {
    const mailOptions = {
        from: 'SIO2_SLAM@enc-bessieres.org',
        to: userEmail,
        subject: 'Code de vérification',
        text: `Votre inscription sur notre réseau social a été prise en compte !
        Il ne vous manque plus qu'à vérifier votre compte avec le code de vérification suivant: ${verificationCode}
        Vos données seront supprimées automatiquement de notre base de données au bout de 5 minutes si votre compte n'est pas validé.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email envoyé : ' + info.response);
        }
    });
};

module.exports = sendEmail;