var nodemailer = require('nodemailer');
// email sender function

module.exports = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
        user: 'ohernandez83@gmail.com',
        pass: 'Cedula18**'
    }
});