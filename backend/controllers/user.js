const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config();

exports.signup = (req, res, next) => {
    console.log(req.body)
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                mail: req.body.email,
                password: hash
            });
            console.log(user)
            user.save()
                .then(() => res.status(201).json({ message: 'utilisateur créé ! ' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};

exports.login = (req, res, next) => {
    const jwtSecret = process.env.PASSWORD_AUTH;

    User.findOne({ mail: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Paire identifiant / mot de passe incorecte' })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    jwtSecret,
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => {
                        res.status(500).json({ error });
                    })
            }
        })
        .catch(error => res.status(500).json({ error }))
};

exports.isconnect = (req, res, next) => {
    let userId = req.body.userId;
    let frontToken = req.body.token;
    const jwtSecret = process.env.PASSWORD_AUTH;

    User.findOne({ _id: userId })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'l\'utilisateur n\'existe pas' });
            } else {
                jwt.verify(frontToken, jwtSecret, (error, decoded) => {
                    if (error) {
                        res.status(401).json({ message: "le token n'est pas ou plus valide" })
                    } else {
                        res.status(200).json({ message: 'Token valide' });
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "une erreur s\'est produite" })
        })
}