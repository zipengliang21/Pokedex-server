import mongoose from "mongoose";

import db from "../mongodb.config";

const instance = db.instance;

export interface IProfile {
    userId: string;
    userName: string;
    userDescription: string;
    password:string;
    avatar:{
        data: Buffer,
        contentType: String
    }
}

export type ProfileDocument = mongoose.Document & IProfile;

const profileSchema = new instance.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    userDescription: {type: String, required: true},
    password:{type:String,required:true},
    avatar: {data: Buffer,contentType: String, required: true},
}, { collection: "profile"})

export const Profile = instance.model<any>('Profile', profileSchema);

