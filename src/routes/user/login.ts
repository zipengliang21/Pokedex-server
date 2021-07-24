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
      try {
          if (!email) {
              throw new ServerError({
                  message: "Please provide your email address",
                  statusCode: 400,
              });
              // res.status(400).send({err:"Please provide your email address"});
          }

          if (!password) {
              throw new ServerError({
                  message: "Please provide your password",
                  statusCode: 400,
              });
              // res.status(400).send("Please provide your password");
          }

          const user: UserDocument = await User.findOne({email});

          if (!user) {
              throw new ServerError({
                  message: "Unable to login, no user with this email",
                  statusCode: 400,
              });
              // res.status(400).send("no such user");
          }

          const isMatch = await bcrypt.compare(password, user.password)

          if (!isMatch) {
              throw new ServerError({
                  message: "Wrong Password",
                  statusCode: 400,
              });
              // res.status(400).send({err:"password not match"});
          } else {
              await sendToken({
                  origin: req.get('Origin'),
                  user: user,
                  statusCode: 200,
                  res: res,
              });
          }
      }catch (err) {
          if (err instanceof ServerError) {
              res.status(err.statusCode).send(err.message);
          } else {
              res.status(500).send("Unexpected error");
          }
      }

}
