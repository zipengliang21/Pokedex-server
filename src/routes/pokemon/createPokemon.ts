import { Request, Response } from 'express';
import {IPokemon, Pokemon, PokemonDocument} from "../../models/pokemon";


// export default async (req: Request, res: Response): Promise<void> => {
//     const newPokemon: IPokemon = await new Pokemon({
//         name: "123",
//         id: "1243",
//         img: "123",
//         type: ["123"],
//         stats: {},
//         moves: {},
//         damages: {},
//         misc: {},
//     }).save();
//
//     res.status(200).json({ newPokemon });
// };
