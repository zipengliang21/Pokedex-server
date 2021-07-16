import { Express } from 'express';
import pokemon from './pokemon/index';
import post from './posts/index';
import comment from './comments/index'
import profile from './profile/index';
import user from './user/index';
import admin from './admin/index'


const setUpRoutes = (app: Express): void => {
    app.get('/posts/:_id', post.getPost);
    app.get('/posts/', post.getPostList);
    app.post('/posts/', post.createPost);

    app.get('/pokemons/:_id', pokemon.getPokemon);
    app.get('/pokemons/', pokemon.getPokemonList);
    app.post('/pokemons/', pokemon.createPokemon);
    app.delete('/pokemons/:id', pokemon.deletePokemon);

    app.get('/comments/:_id', comment.getComment);
    app.get('/comments/', comment.getCommentList);
    app.get('/comments/post/:postID', comment.getCommentForPost);
    app.post('/comments/', comment.createComment);
    app.get('/profile/:_id',profile.getProfile);
    app.post('/profile/edit',profile.editProfile);

    app.post('/login', user.login);
    app.post('/register', user.register);

    app.post('/adminLogin',admin.login);
};

export default setUpRoutes;
