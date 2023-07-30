const mongoose = require('mongoose')


//création du modèle de base de donnée

const projectShema = mongoose.Schema({
    userId: { type: String },
    title: { type: String },
    github: { type: String },
    description: { type: String },
    languagesId: [{ type: String }],
    imageUrl: { type: String }
})

module.exports = mongoose.model('Project', projectShema);