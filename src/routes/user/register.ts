import { Request, Response } from 'express';
import {ServerError} from "../../util/util";
import {Posts} from "../../models/post";
import {IUser, User, UserDocument} from "../../models/user";
import {sendToken} from "../../middleware/auth";

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
    try {

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
        const newUser: UserDocument = await User.findOne({ email: email });
        sendToken({
            origin: req.get('Origin'),
            user: newUser,
            statusCode: 201,
            res: res,
        });
    }catch (err) {
        if (err instanceof ServerError) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(500).send("Unexpected error");
        }
}

}