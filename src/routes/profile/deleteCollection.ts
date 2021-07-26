import { Request, Response } from 'express';
import {Profile, ProfileDocument} from "../../models/profile";
import {Pokemon, PokemonDocument} from "../../models/pokemon";

export default async (req: Request, res: Response): Promise<void> => {
    const _id = req.body.uId;
    const _pokeId = req.body.pokeId;

    const pokemon: PokemonDocument[] = await Pokemon.find({ id:_pokeId });

    const profile: ProfileDocument[] = await Profile.find({ _id });

    Profile.findOneAndUpdate( { _id },{ $pull: {collectionList: {pId:_pokeId} }},
        {upsert: true},
        function(err, model) {
            console.log(err);
    });

    console.log(profile[0].collectionList)
    res.status(200).json({ pokemon });


};