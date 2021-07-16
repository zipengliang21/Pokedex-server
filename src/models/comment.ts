import mongoose from "mongoose";

import db from "../mongodb.config";

const instance = db.instance;

export interface IComment {
    userId: string;
    userName: string;
    postID: string;
    commentID: string;
    content: string;
    date: Date;
}

export type CommentDocument = mongoose.Document & IComment;

const commentSchema = new instance.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    postID: {type: String, required: true},
    commentID: {type: String, required: true},
    content: {type: String, required: true},
    date: { type: Date, required: true},

}, { collection: "comments"})

export const Comments = instance.model<any>('Comments', commentSchema);