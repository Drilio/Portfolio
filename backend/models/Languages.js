const mongoose = require('mongoose')


//création du modèle de base de donnée

const languageSchema = mongoose.Schema({
    _Id: { type: String, required: true },
    Name: { type: String, required: true },
})

module.exports = mongoose.model('Language', languageSchema);