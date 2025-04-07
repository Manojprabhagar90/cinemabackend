require('dotenv').config();

const email_templates = {
    forgot_password_template : (username,token)=>{
        template ={
            subject : `Password reset`,
            body :`<html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    color: #333;
                                    margin: 0;
                                    padding: 0;
                                }
                                .email-container {
                                    width: 100%;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                }
                                .header {
                                    text-align: center;
                                    margin-bottom: 20px;
                                }
                                .header h1 {
                                    color: #333;
                                }
                                .message {
                                    font-size: 16px;
                                    line-height: 1.6;
                                    margin-bottom: 20px;
                                    position: relative;
                                }
                                .reset-button {
                                    position: absolute;
                                    background-color: #07e83f;
                                    color: white;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    display: inline-block;
                                    text-align: center;
                                    margin-top: 10px;
                                    left:200px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 12px;
                                    color: #777;
                                    margin-top: 120px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="email-container">
                                <div class="header">
                                    <h1>Password Reset Request</h1>
                                </div>
                                <div class="message">
                                    <p>Hello ${username},</p>
                                    <p>We received a request to reset your password. If you made this request, please click the button below to reset your password.</p>
                                    <p>If you did not request this change, please ignore this email.</p>
                                    <a href=${process.env.FRONT_BASE_URL}reset_password/${token} class="reset-button">Reset Your Password</a>
                                </div>
                                <div class="footer">
                                    <p>&copy; 2024 YourWebsite. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>`};

                        return template;
    },
    theater_template : (username,password)=>{
        template ={
            subject : `Welcome to moviepal...`,
            body :`<html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    color: #333;
                                    margin: 0;
                                    padding: 0;
                                }
                                .email-container {
                                    width: 100%;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                }
                                .header {
                                    text-align: center;
                                    margin-bottom: 20px;
                                }
                                .header h1 {
                                    color: #333;
                                }
                                .message {
                                    font-size: 16px;
                                    line-height: 1.6;
                                    margin-bottom: 20px;
                                    position: relative;
                                }
                                .reset-button {
                                    position: absolute;
                                    background-color: #07e83f;
                                    color: white;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    display: inline-block;
                                    text-align: center;
                                    margin-top: 10px;
                                    left:200px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 12px;
                                    color: #777;
                                    margin-top: 120px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="email-container">
                                <div class="header">
                                    <h1>Welcome to MOVIEPAL</h1>
                                </div>
                                <div class="message">
                                    <p>Hello ${username},</p>
                                    <p>We created your theater in our website. Please login with below password and manage your theater with screens and seatings and all</p>
                                    <p>Your password : ${password}</p>
                                </div>
                                <div class="footer">
                                    <p>&copy; 2024 YourWebsite. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>`};

                        return template;
    },
    booked_ticket  : (theatername,screenname,seats,tdate,ttime,moviename) => {
         template = {
             subject : `MOVIEPAL TICKET`,
            body :`<html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    color: #333;
                                    margin: 0;
                                    padding: 0;
                                }
                                .email-container {
                                    width: 100%;
                                    max-width: 600px;
                                    margin: 0 auto;
                                    background-color: #ffffff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                }
                                .header {
                                    text-align: center;
                                    margin-bottom: 20px;
                                }
                                .header h1 {
                                    color: #333;
                                }
                                .message {
                                    font-size: 16px;
                                    line-height: 1.6;
                                    margin-bottom: 20px;
                                    position: relative;
                                    text-align: center;
                                }
                                .reset-button {
                                    position: absolute;
                                    background-color: #07e83f;
                                    color: white;
                                    padding: 12px 20px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    display: inline-block;
                                    text-align: center;
                                    margin-top: 10px;
                                    left:200px;
                                }
                                .footer {
                                    text-align: center;
                                    font-size: 12px;
                                    color: #777;
                                    margin-top: 120px;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="email-container">
                                <div class="header">
                                <h1>${moviename}</h1>
                                    <h1>${theatername}</h1>
                                </div>
                                <div class="message">
                                    <p>Screen : ${screenname}</p>
                                    <p>Showtime : ${tdate}, ${ttime}</p>
                                    <p>Seats : ${seats}
                                </div>
                                <div class="footer">
                                    <p>&copy; 2024 YourWebsite. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>`};

                        return template;
         }
}


module.exports = email_templates;