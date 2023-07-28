//import de express
const express = require('express');
//import de MongoDB
const mongoose = require('mongoose');
// import du path du serveur 
const path = require('path');
//import des routes
const userRoutes = require('./routes/user');
const projectRoutes = require('./routes/Projects');
const languagesRoutes = require('./routes/languages');
const sendRoutes = require('./routes/send');

mongoose.connect('mongodb+srv://antoineroy92:test123@clustervieuxgrimoire.wfdhr4u.mongodb.net/portfolio',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//donne accès au corps de la requête en format json
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/api/auth', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/languages', languagesRoutes);
app.use('/api/send', sendRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app;