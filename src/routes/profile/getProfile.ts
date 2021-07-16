import { Request, Response } from 'express';
import {Profile, ProfileDocument} from "../../models/profile";

export default async (req: Request, res: Response): Promise<void> => {
    const _id  = req.params._id;
    const profile: ProfileDocument[] = await Profile.find({ userId:_id });

    console.log(profile[0]);

    res.status(200).json({ profile });
};