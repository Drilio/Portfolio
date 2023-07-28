const nodemailer = require('nodemailer');

exports.sendMail = async (req, res, next) => {
    const { name, email, message } = req.body;
    // Validate the request data here if needed

    try {
        // Create a Nodemailer transporter with your email service configuration
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'portfolioar2023@gmail.com',
                pass: 'yrhikbtktxgsmjbo'
            }
        });

        // Compose the email to be sent
        const mailOptions = {
            from: 'portfolioar2023@gmail.com', // sender address
            to: 'antoineroy92@gmail.com', // list of receivers
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.json({ status: 'success' });
    } catch (error) {
        console.log('----------------------Enter ERROR Send------------------------------------')

        console.error('Error sending email:', error);
        res.status(500).json({ status: 'fail' });
    }

}

