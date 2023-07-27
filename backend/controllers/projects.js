const Project = require('../models/projects');
const mongoose = require('mongoose')


exports.createProject = (req, res, next) => {
    const projectObject = req.body;
    const regexTitle = /^[a-zA-Z0-9\s]+$/;
    const title = req.body.title
    console.log(projectObject)
    if (regexTitle.test(title)) {
        const project = new Project({
            ...projectObject,
            title: title,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        console.log(project)

        project.save()
            .then(() => {
                res.status(201).json({ message: 'Object enregistré !' });
            })
            .catch(() => {
                res.status(400).json({ error });
            })
    } else {
        res.status(400).json({ error })
    }
}

exports.modifyProject = (req, res, next) => {
    const projectObject = req.file ? {
        ...JSON.parse(req, body.book),
        imageUrl: `${req.body}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete projectObject._userId;
    Project.findOne({ _id: req.params.id })
        .then((Project) => {
            if (Project.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-Auorisé' });
            } else {
                Project.updateOne({ _id: req.params.id }, { ...projectObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
}

exports.deleteProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .then(project => {
            if (project.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non-autorisé' });
            } else {
                const filename = project.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    project.deleteOne({ _id: req.params.id })
                        .then(res.status(200).json({ message: 'Objet supprimé !' }))
                        .catch(error => res.status(401).json({ error }));
                })
            }
        })
        .catch(error => {
            res.status(500).json({ error })
        });
}

exports.getAllProjects = (req, res, next) => {
    Project.aggregate([
        {
            $addFields: {
                convertedLanguageIds: {
                    $map: {
                        input: '$languagesId',
                        as: 'languageId',
                        in: {
                            $convert: {
                                input: { $toObjectId: '$$languageId' },
                                to: 'objectId',
                                onError: null,
                            },
                        },
                    },
                },
            },
        },
        {
            $lookup: {
                from: 'languages',
                localField: 'convertedLanguageIds',
                foreignField: '_id',
                as: 'languagesUse',
            },
        },
        {
            $project: {
                title: 1,
                imageUrl: 1,
                languagesUse: { $map: { input: '$languagesUse', as: 'lang', in: '$$lang.Name' } },
                github: 1,
                description: 1,
            },
        },
    ])
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => res.status(400).json({ error }));
};

exports.getOneProject = (req, res, next) => {
    const projectId = req.params.id
    Project.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(projectId) }
        },
        {
            $addFields: {
                convertedLanguageIds: {
                    $map: {
                        input: '$languagesId',
                        as: 'languageId',
                        in: {
                            $convert: {
                                input: { $toObjectId: '$$languageId' },
                                to: 'objectId',
                                onError: null,
                            },
                        },
                    },
                },
            },
        },
        {
            $lookup: {
                from: 'languages',
                localField: 'convertedLanguageIds',
                foreignField: '_id',
                as: 'languagesUse',
            },
        },
        {
            $project: {
                title: 1,
                imageUrl: 1,
                languagesUse: { $map: { input: '$languagesUse', as: 'lang', in: '$$lang.Name' } },
                github: 1,
                description: 1,
            },
        },
    ])
        .then(project => {
            if (project.length === 0) {
                return res.status(404).json({ message: 'Le projet n\'a pas été trouvé' });
            }
            res.status(200).json(project[0]);
        })
        .catch(error => res.status(404).json({ error }));
}


