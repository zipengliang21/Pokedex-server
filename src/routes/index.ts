import { Express } from 'express';
import pokemon from './pokemon/index';

const setUpRoutes = (app: Express): void => {
   app.get('/pokemons/:_id', pokemon.getPokemon);
   app.get('/pokemons/', pokemon.getPokemonList);
   // app.post('/pokemons/:_id', pokemon.getPokemon);
};

export default setUpRoutes;
