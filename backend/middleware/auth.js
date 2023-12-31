const jwt = require('jsonwebtoken');
require("dotenv").config();


//verification du token + transmition aux routes
module.exports = (req, res, next) => {
    try {
        console.log('-------------------------Enter AUTH-----------------------------------')
        const token = req.headers.authorization.split(' ')[1];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.PASSWORD_AUTH);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
        console.log('-------------------------leave AUTH-----------------------------------')

        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        res.status(401).json({ error: "Invalid or expired token" });
    }
};