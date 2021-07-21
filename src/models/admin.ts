import mongoose from "mongoose";


const AdminModel = mongoose.model('admin',
    new mongoose.Schema({
        adminId: String,
        adminName: String,
        password: String
    }), 'admin'
);

module.exports = AdminModel;

// import mongoose from 'mongoose';
// import validator from 'validator';
// import bcrypt from 'bcrypt';
//
// import db from '../mongodb.config';
//
// const instance = db.instance;
//
// export interface IAdmin {
//     adminId?: String,
//     adminName: String,
//     password: String
// }
//
// export type AdminDocument = mongoose.Document & IAdmin;
