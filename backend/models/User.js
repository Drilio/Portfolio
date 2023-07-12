const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    password: { type: String, required: true },
    name: { type: String, required: true },
    mail: { type: String, required: true, unique: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);