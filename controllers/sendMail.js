const nodemailer = require('nodemailer');


const sendMail = async options=>{
    //transporter
    const transporter = nodemailer/createTransport({
        host: process.env.MAILHOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    //define the email options
    const mailOptions={
        from:'ChaitKris <chaitkris04@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;