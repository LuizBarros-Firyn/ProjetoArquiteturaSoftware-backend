const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date_of_birth: Date,
});

module.exports = mongoose.model('User', UserSchema);