import { Request, Response } from 'express';
import {Comments, CommentDocument,IComment} from "../../models/comment";
import {Posts} from '../../models/post';
import { ServerError } from '../../util/util';
import { MESSAGES } from '../../util/constants';

export default async (req: Request, res: Response): Promise<void> => {
    const {
        userId,
        userName,
        postID,
        commentID,
        content,
        date
    }: {userId: string;
        userName: string;
        postID: string;
        commentID: string;
        content: string;
    date:Date} = req.body;

    if (content === null || content === undefined || typeof content !== 'string') {
        throw new ServerError({ statusCode: 400, message: MESSAGES.EMPTY_COMMENT });
    }

    let articleExists: boolean;
    try {
        articleExists = await Posts.exists({ postID: postID });
    } catch (err) {
        throw new ServerError({
            statusCode: 400,
            message: MESSAGES.POST_ID_NOT_FOUND,
        });
    }
    if (!articleExists) {
        throw new ServerError({
            statusCode: 400,
            message: MESSAGES.POST_ID_NOT_FOUND,
        });
    }

    const commentInfo: IComment = {
        userId,
        userName,
        postID,
        commentID,
        content,
        date,
    };
    const newComment: CommentDocument = await new Comments(commentInfo).save();
    res.status(201).json({ comment: newComment });
};