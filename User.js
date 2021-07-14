const mongoose = require("mongoose");

const UserModel = mongoose.model('profile',
    new mongoose.Schema({
        userId: String,
        userName: String,
        userDescription: String,
        password: String
    }), 'profile'
);

module.exports = UserModel;