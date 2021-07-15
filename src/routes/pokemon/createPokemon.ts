// import { Request, Response } from 'express';
// import {IPokemon, Pokemon, PokemonDocument} from "../../models/pokemon";
//
//
//
// export default async (req: Request, res: Response): Promise<void> => {
//     let newPokemon = req.body;
//     await new Pokemon(newPokemon).save();
//     const pokeList = await Pokemon.find({});
//     res.status(200).json(pokeList);
//     // const newPokemon: IPokemon = await new Pokemon({
//     //     name: "123",
//     //     id: "1243",
//     //     img: "123",
//     //     type: ["123"],
//     //     stats: {},
//     //     moves: {},
//     //     damages: {},
//     //     misc: {},
//     // }).save();
//
//     // res.status(200).json({ newPokemon });
// };
import { Request, Response } from 'express';
import {IPokemon, Pokemon, PokemonDocument} from "../../models/pokemon";



export default async (req: Request, res: Response): Promise<void> => {
    let newPokemon = req.body;
    let result = await Pokemon.find({});
    let img = "http://img.pokemondb.net/artwork/" + newPokemon.name.toLowerCase() +".jpg";
    let id = result.length + 1 +'';
    var pokemon = new Pokemon({
        id: id,
        name: newPokemon.name,
        type: [newPokemon.type],
        img: img,
        stats: {
            hp: newPokemon.baseHp,
            attack: newPokemon.baseAttack,
            defense: newPokemon.baseDefense,
            spattck: newPokemon.baseSpAtk,
            spdefense: newPokemon.baseSpDef,
            speed: newPokemon.baseSpeed
        },
        misc: {
            height: newPokemon.height,
            weight: newPokemon.weight,
            abilities: {normal:newPokemon.abilities,
             hidden: newPokemon.abilities}
        }
    });
    await pokemon.save();
        // function (err: any, results:any) {
        //     if (err){
        //         console.log(err)
        //         res.status(400).json({
        //             message: err
        //         });
        //     }
        //     else{
        //         console.log(results._id);
        //         res.status(200).json({
        //             message: "Add Pokemon : "+results._id,
        //         });
        //     }
        // }

    const added = await Pokemon.findOne({id: id});
    res.status(200).json({ added });
};