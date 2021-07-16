import { Request, Response } from 'express';
import {IProfile, Profile, ProfileDocument} from "../../models/profile";

export default async (req: Request, res: Response): Promise<void> => {
    // const userId: string = req.body.userId;
    // const userName: string = req.body.userName;
    // const userDescription: string = req.body.description
    // ? req.body.description
    // : 'no description';
    // const avatar:any = req.body.avatar;
    // const password:string = req.body.password;

    // const profileInfo: IProfile ={
    //     userId,
    //     userName,
    //     userDescription,
    //     avatar,
    //     password,
    // };
    // const newProfile: ProfileDocument = await new Profile(profileInfo).save();
    // const savedPost: ProfileDocument = await Profile.findById(
    //     newProfile._id
    // )
    // res.status(201).json({ savedPost: savedPost });
    res.status(201);
};
