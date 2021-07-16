import mongoose from "mongoose";

import db from "../mongodb.config";

const instance = db.instance;

export interface IProfile {
    userId: String;
    userName: String;
    userDescription: String;
    password:String;
    location:String;
    avatar:{data: Buffer,contentType: String};
}

export type ProfileDocument = mongoose.Document & IProfile;

const AvatarSchema = new instance.Schema({
    data: Buffer,
    contentType: String,
})

const profileSchema = new instance.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    userDescription: {type: String},
    password:{type:String,required:true},
    location:{type:String},
    avatar: AvatarSchema,
}, { collection: "profile"})

export const Profile = instance.model<any>('Profile', profileSchema);

