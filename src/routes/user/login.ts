import { Request, Response } from 'express';
import {ServerError} from "../../util/util";
const UserModel = require('../../models/user');




export default async (req: Request, res: Response): Promise<void> => {
    const {
        userName,
        password
    } = req.body;
    console.log(userName);
    let userExist: boolean;
    try {
        userExist = await UserModel.exists({ userName: userName });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Finding existing user");
    }

    if (!userExist) {
        throw new ServerError({
            statusCode: 400,
            message: "User Not Exist",
        });
    }
    let user: any;
    try {
        user = UserModel.findOne({
            userName
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
    const isMatch = user.password == password;
    if (!isMatch) {
        throw new ServerError({
            statusCode: 400,
            message: "Incorrect Password",
        });
    } else {
        res.status(200).json({
            message: "Login Successfully !"
        });
    }

}
