import { Request, Response } from 'express';
import {ServerError} from "../../util/util";
import {Posts} from "../../models/post";
import {IUser, User} from "../../models/user";

export default async (req: Request, res: Response): Promise<void> => {
    const {
        email,
        userName,
        password,
        confirmPassword
    } = req.body;
    let userExist: IUser;
    try {
        userExist = await User.findOne({ email: email });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Finding existing user");
    }
    if (userExist) {
        throw new ServerError({
            statusCode: 400,
            message: "User Already Exist",
        });
    }
    // save new user to db
    const userInfo: IUser = {
        email,
        userName,
        password: password,
    };

    await new User(userInfo).save();
    res.status(200).json({
        msg: "User Created Successfully"
    });
}