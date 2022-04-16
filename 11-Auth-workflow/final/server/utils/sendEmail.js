const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
    // the below line is coming from nodemailer website
    let testAccount = await nodemailer.createTestAccount();

    // the below code is coming from ethereal website
    const transporter = nodemailer.createTransport(nodemailerConfig);

    // the below code is coming from nodemailer website
    return transporter.sendMail({
        from: '"Learn With Srikanth Racharla" <racharlasrikanth@gmail.com>', // sender address
        to,
        subject, 
        html
    });
};

module.exports = sendEmail;