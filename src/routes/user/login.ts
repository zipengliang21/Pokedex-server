import { Request, Response } from 'express';
import {ServerError} from "../../util/util";
import {IUser, User} from "../../models/user";


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

    const user: IUser = await User.findOne({
        email,
        password,
    });

    if (!user) {
        throw new ServerError({
            message: "Incorrect Password",
            statusCode: 400,
        });
    }

    res.status(200).json({
        message: "Login Successfully !"
    });
}
