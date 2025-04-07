const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
require('dotenv').config();
const common_utils = {
    email_send : (email_to,email_subject,email_body) =>{
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.mail_username,  
                pass: process.env.mail_password    
            }
        });

        // Set up email data
        let mailOptions = {
            from: process.env.mail_username,   
            to: email_to,  
            subject: email_subject,  
            html: email_body  
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred: ' + error.message);
                return;
            }
            console.log('Message sent: %s', info.messageId);
        });
    },
    generate_random_string : (length) =>{
       return randomstring.generate(length);
    }
}

module.exports = common_utils;