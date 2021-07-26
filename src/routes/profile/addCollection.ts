import { Request, Response } from 'express';
import {Profile, ProfileDocument} from "../../models/profile";
import {ServerError} from "../../util/util";
import {Pokemon, PokemonDocument} from "../../models/pokemon";

export default async (req: Request, res: Response): Promise<void> => {
    const _id = req.body.uId;
    const _pokeId = req.body.pokeId;

    const profile: ProfileDocument[] = await Profile.find({ _id });

    // try {
    //     const pokeExist = profile[0].collectionList.filter(function(e:any) { return e.pId === _pokeId; }).length > 0;
    // } catch (err) {
    //     console.log(err.message);
    //     res.status(500).send("Error in Finding existing user");
    // }
    // try {
    //     if (pokeExist) {
    //         throw new ServerError({
    //             statusCode: 400,
    //             message: "User Already Exist",
    //         });
    // }
    Profile.findOneAndUpdate( { _id },{ $push: {collectionList: {pId:_pokeId} }},
    {upsert: true},function(err, model) {
        if(err){
            console.log(err);
            return res.send(400);
        }
        return res.send(200);
    });
};