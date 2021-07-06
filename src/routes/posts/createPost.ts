import { Request, Response } from 'express';
import {Posts, PostDocument} from "../../models/post";

export default async (req: Request, res: Response): Promise<void> => {
    let newPost = req.body;
    await new Posts(newPost).save();
    const postList = await Posts.find({});
    // res.json(cardList);

    res.status(200).json(postList);
};