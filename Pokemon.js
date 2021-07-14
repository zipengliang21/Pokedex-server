const mongoose = require("mongoose");

const Pokemon = mongoose.model('pokemon',
    new mongoose.Schema({
        id: String,
        name: String,
        img: String,
        type: Array,
        stats: {
            hp: Number,
            attack: String,
            defense: String,
            spattck: String,
            spdefense: String,
            speed: Number
        },
        moves: {
            level: Array,
            tmhm: Array,
            egg: Array,
            tutor: Array,
            gen34: Array
        },
        damages: {
            normal: String,
            fire: String,
            water: String,
            electric: String,
            grass: String,
            ice: String,
            fight: String,
            poison: String,
            ground: String,
            flying: String,
            psychic: String,
            bug: String,
            rock: String,
            ghost: String,
            dragon: String,
            dark: String,
            steel: String
        },
        misc: {
            sex: {
                male: Number,
                female: Number
            },
            abilities: {
                normal: Array,
                hidden: Array
            },
            classification: String,
            height: String,
            weight: String,
            capturerate: Number,
            eggsteps: String,
            expgrowth: String,
            happiness: String,
            evpoints: Array,
            fleeflag: String,
            entreeforestlevel: String
        }
    })
);

module.exports = Pokemon;