const mongoose = require('mongoose')


//création du modèle de base de donnée

const languageSchema = mongoose.Schema({
    userId: { type: String },
    Name: { type: String, required: true },
    imageUrl: { type: String }
})

module.exports = mongoose.model('Language', languageSchema);