import { Request, Response } from 'express';
import {Profile, ProfileDocument} from "../../models/profile";

export default async (req: Request, res: Response): Promise<void> => {
    const userName: string = req.body.userName;
    const userDescription: string = req.body.description ? req.body.description : 'no description';
    const avatar:any = req.body.avatar;
    const password:string = req.body.password;
    const location:string = req.body.location? req.body.location : '';

    const id  = req.body.userId;
    // console.log(profile[0])

    // profile[0].userName = userName;
    // profile[0].userDescription = userDescription;
    // profile[0].password = password;
    // profile[0].location = location;

    const condition = {userId:id };

    const query = {'userName': userName,
                   'userDescription':userDescription,
                    'password':password,
                    'location':location};

    Profile.findOneAndUpdate(condition, query, {upsert: true}, function(err, doc) {
        if (err) return res.send(500);
        return res.send("promise done");
    });
};