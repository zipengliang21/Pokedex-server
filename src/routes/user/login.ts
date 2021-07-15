import { Request, Response } from 'express';
import {ServerError} from "../../util/util";
import {IUser, User} from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export default async (req: Request, res: Response): Promise<void> => {
    const {
        email,
        password
    } = req.body;

    if (!email) {
        throw new ServerError({
            message: "Please provide your email address",
            statusCode: 400,
        });
    }

    if (!password) {
        throw new ServerError({
            message: "Please provide your password",
            statusCode: 400,
        });
    }

    const user: IUser = await User.findOne({ email });

    if (!user) {
        throw new ServerError({
            message: "Unable to login",
            statusCode: 400,
        });
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new ServerError({
            message: "Wrong Password",
            statusCode: 400,
        });
    }

    console.log(process.env.JWT_SECRET)
    // @ts-ignore
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    // @ts-ignore
    user.tokens = user.tokens.concat({ token })
    user.password = password;
    await new User(user).save();

    res.status(200).json({
        message: "Login Successfully !"
    });
}
