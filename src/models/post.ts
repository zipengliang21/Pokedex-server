import mongoose from "mongoose";

import db from "../mongodb.config";

const instance = db.instance;

export interface IPost {
    userId: string;
    userName: string;
    postID: string;
    title: string;
    description: string;
    content: string;
    date: Date;
}

export type PostDocument = mongoose.Document & IPost;

const postSchema = new instance.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    postID: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    date: { type: Date, required: true},
}, { collection: "posts"})

export const Posts = instance.model<any>('Posts', postSchema);