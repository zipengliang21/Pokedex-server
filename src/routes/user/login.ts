import { Request, Response } from 'express';
import {ServerError} from "../../util/util";
import {User, UserDocument} from "../../models/user";
import bcrypt from "bcrypt";
import {sendToken} from "../../middleware/auth";

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

    const user: UserDocument = await User.findOne({ email });

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

    sendToken({
        origin: req.get('Origin'),
        user: user,
        statusCode: 200,
        res: res,
    });
}
