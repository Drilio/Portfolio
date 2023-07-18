const express = require('express');
const router = express.Router();
const languageCtrl = require('../controllers/languages');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp');



router.post('/', multer, sharp, languageCtrl.createLanguage);
router.get('/', languageCtrl.getAllLanguages);
router.get('/:id', languageCtrl.getOneLanguage);
router.put('/:id', auth, languageCtrl.modifyLanguage);
router.delete('/:id', auth, languageCtrl.deleteLanguage);


module.exports = router;
