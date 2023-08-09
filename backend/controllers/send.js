const nodemailer = require('nodemailer');
require("dotenv").config();
const https = require('https');

exports.sendMail = async (req, res, next) => {
    const { name, email, message, token } = req.body;
    // Validate the request data here if needed
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let nameRegex = /^[a-zA-Z]{1,20}\d{0,3}$/;
    let regexMessage = /^[a-zA-Z0-9\s.,!?'"()\-]*$/;
    if (emailRegex.test(email) && nameRegex.test(name) && regexMessage.test(message)) {
        try {
            const recaptchaSecretKey = process.env.SECRET_KEY;
            const recaptchaResponse = await verifyRecaptcha(recaptchaSecretKey, token);
            console.log('recaptchaResponse:', recaptchaResponse); // Add this line to check the response

            if (recaptchaResponse.success) {                // Create a Nodemailer transporter with your email service configuration
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });
                console.log('Transporter:', transporter); // Add this line to check the transporter object

                // Compose the email to be sent
                const mailOptions = {
                    from: process.env.EMAIL_USER, // sender address
                    to: process.env.EMAIL_FINAL_ADRESS, // list of receivers
                    subject: 'New Contact Form Submission',
                    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
                };

                // Send the email
                await transporter.sendMail(mailOptions);

                res.json({ status: 'success' });

            } else {
                res.status(400).json({ error: "Failed reCAPTCHA verification" });
            }
        } catch (error) {
            console.log('----------------------Enter ERROR Send------------------------------------');
            console.error('Error sending email:', error);
            res.status(500).json({ status: 'fail' });
        }
    } else {
        res.status(400).json({ error });
    }
};



async function verifyRecaptcha(secretKey, token) {
    return new Promise((resolve, reject) => {
        const postData = `secret=${secretKey}&response=${token}`;
        const options = {
            method: 'POST',
            hostname: 'www.google.com',
            path: '/recaptcha/api/siteverify',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length,
            },
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

