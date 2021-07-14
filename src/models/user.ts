import mongoose from "mongoose";


const UserModel = mongoose.model('profile',
    new mongoose.Schema({
        userId: String,
        userName: String,
        userDescription: String,
        password: String
    }), 'profile'
);
module.exports = UserModel;
// import mongoose from 'mongoose';
//
// import db from '../mongodb.config';
//
// const instance = db.instance;
//
// export interface IUser {
//     userId: String,
//     userName: String,
//     userDescription?: String,
//     password: String,
//     avatar?: Object,
// }
//
// export type UserDocument = mongoose.Document & IUser;
//
// const userSchema = new instance.Schema({
//     userId:{ type: String, default: '' },
//     userName: { type: String, required: true },
//     userDescription: { type: String, default: ''},
//     password: {
//         type: String,
//         required: true,
//     },
// });
//
// export const User = instance.model<UserDocument>('User', userSchema);