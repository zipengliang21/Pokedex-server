import jwt from "jsonwebtoken"
import {User} from "../models/user";
import {NextFunction, Request, Response} from "express";
import {ServerError} from "../util/util";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // @ts-ignore
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new ServerError({
                message: "Unable to login",
                statusCode: 400,
            });
        }

        // @ts-ignore
        req.token = token
        // @ts-ignore
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth