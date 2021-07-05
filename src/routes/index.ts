import { Express } from 'express';
import pokemon from './pokemon/index';
import post from './posts/index';
import comment from './comments/index'

const setUpRoutes = (app: Express): void => {
    app.get('/posts/:_id', post.getPost);
    app.get('/posts/', post.getPostList);
    app.get('/pokemons/:_id', pokemon.getPokemon);
    app.get('/pokemons/', pokemon.getPokemonList);
    app.get('/comments/:_id', comment.getComment);
    app.get('/comments/', comment.getCommentList);
   // app.post('/pokemons/:_id', pokemon.getPokemon);
};

export default setUpRoutes;
