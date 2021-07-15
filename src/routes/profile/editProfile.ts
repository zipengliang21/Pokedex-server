import { Request, Response } from 'express';
import {IProfile, Profile, ProfileDocument} from "../../models/profile";

export default async (req: Request, res: Response): Promise<void> => {
    const userId: string = req.body.userId;
    const userName: string = req.body.userName;
    const userDescription: string = req.body.description
    ? req.body.description
    : 'no description';
    const avatar:any = req.body.avatar;
    const password:string = req.body.password;

    const _id  = req.params._id;
    const profile: ProfileDocument[] = await Profile.find({ _id });

    // profile.userId = userId;
    // profile.values.userName = userName;
    // profile.values.userDescription = userId;
    // profile.values.userId = userId;
    // profile.values.userId = userId;

    console.log(req)
    res.status(201).json({ profile });
};