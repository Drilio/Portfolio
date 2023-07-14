const mongoose = require('mongoose')


//création du modèle de base de donnée

const projectShema = mongoose.Schema({
    title: { type: String, required: true },
    languagesId: [{ languageId: String }],
    imageUrl: { type: String, required: true },
})

module.exports = mongoose.model('Project', projectShema);