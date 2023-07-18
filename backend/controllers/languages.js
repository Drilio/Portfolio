const language = require('../models/Languages');

exports.createLanguage = (req, res, next) => {
    const languageObject = req.body;
    // delete languageObject._id;
    // delete languageObject.userId;
    console.log(req.body)
    const newObject = new language({
        ...languageObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(newObject)

    newObject.save()
        .then(() => {
            res.status(201).json({ message: 'Object enregistré !' });
        })
        .catch(() => {
            res.status(400).json({ error });
        })
}

exports.getAllLanguages = (req, res, next) => {
    language.find()
        .then(languages => res.status(200).json(languages))
        .catch(error => res.status(400).json({ error }))
}

exports.getOneLanguage = (req, res, next) => {
    language.findOne({ _id: req.params.id })
        .then(language => res.status(200).json(language))
        .catch(error => res.status(404).json({ error }));
}

exports.modifyLanguage = (req, res, next) => {
    delete languageObject._userId;
    language.findOne({ _id: req.params.id })
        .then((language) => {
            if (language.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-Auorisé' });
            } else {
                language.updateOne({ _id: req.params.id }, { ...languageObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
}

exports.deleteLanguage = (req, res, next) => {
    language.findOne({ _id: req.params.id })
        .then(language => {
            if (language.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' });
            } else {
                language.deleteOne({ _id: req.params.id })
                    .then(res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch(error => {
            res.status(500).json({ error })
        });
}