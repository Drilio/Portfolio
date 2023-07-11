const mongoose = require('mongoose')


//création du modèle de base de donnée

const projectShema = mongoose.Schema({
    _Id: { type: String, required: true },
    title: { type: String, required: true },
    language_Id: [
        {
            _id: String,
            Name: String,
        }],
})

module.exports = mongoose.model('Project', projectShema);