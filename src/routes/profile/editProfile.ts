import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import {Profile, ProfileDocument} from "../../models/profile";

export default async (req: Request, res: Response): Promise<void> => {
    const email:string = req.body.email;
    const userName: string = req.body.userName;
    const description: string = req.body.description ? req.body.description : 'no description';
    const location:string = req.body.location? req.body.location : '';
    const _id  = req.body.userId;

    const password = await bcrypt.hash(req.body.password, 8);

    const condition = {_id};

    const query = {'email':email,
        'userName': userName,
        'description':description,
        'password':password,
        'location':location};

    Profile.findOneAndUpdate(condition, query, {upsert: true}, function(err, doc) {
        if (err) return res.send(500);
        return res.send("promise done");
    });

};