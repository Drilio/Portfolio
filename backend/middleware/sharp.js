const sharp = require('sharp');
const fs = require("fs");
const path = require("path");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        let filePathObject = path.parse(req.file.filename);

        if (filePathObject.ext == ".webp") {
            //retailler l'image
            sharp()
                .resize({
                    width: process.env.IMG_RESIZE,
                })
            next();
        } else {
            let newPath = `images/${filePathObject.name}.webp`;
            let newFileName = `${filePathObject.name}.webp`

            //retailler l'image + conversion en webp
            sharp(req.file.path)
                .webp({ quality: process.env.IMG_QUALITY })
                .resize({
                    width: process.env.IMG_RESIZE,
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
    } catch {
        (error) => res.status(401).json({ error });
    }
};