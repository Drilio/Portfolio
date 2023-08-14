const language = require('../models/Languages');

exports.createLanguage = (req, res, next) => {
    console.log(req.body)
    const languageObject = req.body;
    const name = req.body.Name
    const regexName = /^[a-zA-Z0-9\s]+$/;
    console.log(regexName.test(name))
    if (regexName.test(name)) {
        const newObject = new language({
            ...languageObject
        });
        console.log(newObject)

        newObject.save()
            .then(() => {
                res.status(201).json({ message: 'Object enregistré !' });
            })
            .catch(() => {
                console.error('Error saving object:', error);
                res.status(400).json({ error: 'Failed to save the object' });
            })
    } else {
        res.status(400).json({ error: 'Invalid name format' });
    }

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
    console.log(req.body)
    languageObject = req.body;
    const languageId = req.params.id;

    delete languageObject._userId;

    language.findByIdAndUpdate(

        languageId,
        { $set: languageObject },
        { new: true, runValidators: true }
    )
        .then((updatedLanguage) => {
            if (!updatedLanguage) {
                return res.status(404).json({ message: 'Projet non trouvé' });
            }
            console.log('Object successfully modified:', updatedLanguage);
            res.status(200).json({ message: 'Objet modifié !' });
        })
        .catch((error) => {
            console.log('Error updating project:', error);
            res.status(500).json({ error });
        });

}

exports.deleteLanguage = (req, res, next) => {
    language.findOne({ _id: req.params.id })
        .then(language => {
            console.log(language.userId, req.auth.userId)
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