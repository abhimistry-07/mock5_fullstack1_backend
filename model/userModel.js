const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = { UserModel };