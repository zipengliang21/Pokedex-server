import { Request, Response } from 'express';
import {ServerError} from "../../util/util";
import {Posts} from "../../models/post";
const UserModel = require('../../models/user');

export default async (req: Request, res: Response): Promise<void> => {
    const {
        userName,
        password
    } = req.body;
    let userExist: boolean;
    try {
        userExist = await UserModel.exists({ userName: userName });
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
    let user = new UserModel({
        userName,
        password
    });
    user.save();
    res.status(200).json({
        msg: "User Created Successfully"
    });
}