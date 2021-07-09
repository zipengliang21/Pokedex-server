import { Express } from 'express';
import pokemon from './pokemon/index';
import post from './posts/index';
import comment from './comments/index'

const setUpRoutes = (app: Express): void => {
    app.get('/posts/:_id', post.getPost);
    app.get('/posts/', post.getPostList);
    app.post('/posts/', post.createPost);
    app.get('/pokemons/:_id', pokemon.getPokemon);
    app.get('/pokemons/', pokemon.getPokemonList);
    app.post('/pokemons/', pokemon.createPokemon);
    app.get('/comments/:_id', comment.getComment);
    app.get('/comments/', comment.getCommentList);
    app.post('/comments/', comment.createComment);

};

export default setUpRoutes;
