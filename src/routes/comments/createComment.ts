import { Request, Response } from 'express';
import {Comments, CommentDocument} from "../../models/comment";

export default async (req: Request, res: Response): Promise<void> => {
    let newComment = req.body;
    await new Comments(newComment).save();
    const commentList = await Comments.find({});
    res.status(200).json(commentList);
};