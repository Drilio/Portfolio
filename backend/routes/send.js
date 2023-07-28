const express = require('express');
const router = express.Router();
const sendCtrl = require('../controllers/send');

router.post('/', sendCtrl.sendMail);

module.exports = router