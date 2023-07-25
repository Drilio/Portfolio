const mongoose = require('mongoose')


//création du modèle de base de donnée

const projectShema = mongoose.Schema({
    title: { type: String, required: true },
    github: { type: String, required: true },
    description: { type: String },
    languagesId: [{ type: String }],
    imageUrl: { type: String }
})

module.exports = mongoose.model('Project', projectShema);