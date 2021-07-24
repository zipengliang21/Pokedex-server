import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import {Profile, ProfileDocument} from "../../models/profile";

export default async (req: Request, res: Response): Promise<void> => {
    const email:string = req.body.email;
    const userName: string = req.body.userName;
    const description: string = req.body.description ? req.body.description : 'no description';
    const avatar:any = req.body.avatar;
    const password:string = req.body.password;
    const location:string = req.body.location? req.body.location : '';
    const cPassword:string = req.body.cPassword;

    const id  = req.body.userId;

    const isMatch = await bcrypt.compare(password, cPassword)

    const condition = {userId:id };

    const query = {'email':email,
                    'userName': userName,
                   'description':description,
                    'password':password,
                    'location':location};

    if(isMatch){
        Profile.findOneAndUpdate(condition, query, {upsert: true}, function(err, doc) {
            if (err) return res.send(500);
            return res.send("promise done");
        });
    } else{
        res.status(300).send('pwd mismatched');
    }


};