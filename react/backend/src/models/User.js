const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    data: Date,
    active: Boolean,
    password: String
});


module.exports = mongoose.model('User', UserSchema);