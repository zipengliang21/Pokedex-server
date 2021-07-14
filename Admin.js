const mongoose = require("mongoose");

const AdminModel = mongoose.model('admin',
    new mongoose.Schema({
        adminId: String,
        adminName: String,
        password: String
    }), 'admin'
);

module.exports = AdminModel;