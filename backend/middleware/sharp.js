const sharp = require('sharp');
const fs = require("fs");
const path = require("path");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        let filePathObject = path.parse(req.file.filename);
        console.log('IMG_QUALITY:', 80);
        console.log('IMG_RESIZE:', process.env.IMG_RESIZE);
        if (filePathObject.ext == ".webp") {
            console.log('ENTERING SHARP DEJA WEBP')
            //retailler l'image
            sharp()
                .resize({
                    width: parseInt(process.env.IMG_RESIZE, 10),
                })
            console.log('END SHARP DEJA WEBP')

            next();
        } else {
            console.log('ENTERING SHARP RETAILLAGE ET CONVERSION WEBP')
            let newPath = `images/${filePathObject.name}.webp`;
            let newFileName = `${filePathObject.name}.webp`

            //retailler l'image + conversion en webp
            sharp(req.file.path)
                .webp({ quality: parseInt(process.env.IMG_QUALITY, 10) })
                .resize({
                    width: parseInt(process.env.IMG_RESIZE, 10),
                })
                .toFile(newPath, function () {
                    fs.unlinkSync(`./images/${req.file.filename}`);
                    req.file = {
                        filename: newFileName
                    };
                    next();
                })
                .catch(error => {
                    res.status(400).json({ error });
                });
        }
    } catch (error) {
        res.status(401).json({ error });
    }
};