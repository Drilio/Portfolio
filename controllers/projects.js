const Project = require('../models/projects');

exports.createProject = (req, res, next) => {
    const projectObject = JSON.parse(req.body.project);
    delete projectObject._id;
    delete projectObject.userId;

    const project = new Project({
        ...projectObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    project.save()
        .then(() => {
            res.status(201).json({ message: 'Object enregistré !' });
        })
        .catch(() => {
            res.status(400).json({ error });
        })
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
    Project.find()
        .then(projects => res.status(200).json(projects))
        .catch(error => res.status(400).json({ error }))
}

exports.getOneProject = (req, res, next) => {
    Project.findOne({ _id: req.params.id })
        .then(project => res.status(200).json(project))
        .catch(error => res.status(404).json({ error }));
}


