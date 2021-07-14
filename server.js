var express = require('express');
var bodyParser = require('body-parser')
const cors = require("cors");
const mongoose = require('mongoose');
var app = express();
const UserModel = require('./model/User');
const AdminModel = require('./model/Admin');
const PokemonModel = require('./model/Pokemon');

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const mongoDB = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.ioe1m.mongodb.net/Pokemon';
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb');
});

mongoose.connection.on('error',()=>{
    console.log('error connecting to mongodb');
});

app.use(
    cors({
      origin: [
        "http://localhost:8075",
        "http://localhost:3000",
      ], //location that React app were connecting to
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "X-Forwarded-Proto",
        "Cookie",
        "Set-Cookie",
      ],
      exposedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "X-Forwarded-Proto",
        "Cookie",
        "Set-Cookie",
      ],
      credentials: true,
    })
);

app.post('/register', urlencodedParser, function (req, res) {
    const {
        userName,
        password
    } = req.body;
    try {
        let user = UserModel.findOne({
            userName
        });
        if (user) {
            return res.status(400).json({
                msg: "User Already Exists"
            });
        }
        user = new UserModel({
            userName,
            password
        });
        user.save();
        res.status(200).json({
            msg: "User Created Successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
});

app.post('/login', urlencodedParser, function (req, res) {
    const {
        userName,
        password
    } = req.body;
    console.log(userName);
    try {
        let user = UserModel.findOne({
            userName
        });
        if (!user)
            return res.status(400).json({
              message: "User Not Exist"
            });
        const isMatch = user.password == password;
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect Password !"
            });
        } else {
            res.status(200).json({
                message: "Login Successfully !"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
    }
});

app.post('/adminLogin', urlencodedParser, function (req, res) {
    const {
        userName,
        password
    } = req.body;
    console.log(userName);
    try {
        let user = AdminModel.findOne({
            userName
        });
        if (!user)
            return res.status(400).json({
              message: "User Not Exist"
            });
        const isMatch = user.password == password;
        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect Password !"
            });
        } else {
            res.status(200).json({
                message: "Login Successfully !"
            });
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
    }
});

app.delete('/pokemons', jsonParser, function (req, res) {
    const {
        id,
        name
    } = req.body;
    console.log(req.body);
    try {
        PokemonModel.findOneAndDelete({
            id,
            name
        }, function (err, docs) {
            if (err){
                console.log(err)
                res.status(400).json({
                    message: err
                });
            }
            else{
                console.log("Deleted Pokemon : ", docs);
                res.status(200).json({
                    message: "Deleted Pokemon : ", docs
                });
            }
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
    }
});

app.post('/pokemons', jsonParser, async function (req, res) {
    const {
        name,
        type,
        species,
        abilities,
        height,
        weight,
        baseHp,
        minHp,
        maxHp,
        baseAttack,
        minAttack,
        maxAttack,
        baseSpAtk,
        minSpAtk,
        maxSpAtk,
        baseSpDef,
        minSpDef,
        maxSpDef,
        baseDefense,
        minDefense,
        maxDefense,
        baseSpeed,
        minSpeed,
        maxSpeed
    } = req.body;
    console.log(req.body);
    let result = await PokemonModel.find({});
    var pokemon = new PokemonModel({
        id: result.length + '',
        name: name,
        type: [type],
        stats: {
            hp: baseHp,
            attack: baseAttack,
            defense: baseDefense,
            spattck: baseSpAtk,
            spdefense: baseSpDef,
            speed: baseSpeed
        }
    });
    pokemon.save(
        function (err, results) {
            if (err){
                console.log(err)
                res.status(400).json({
                    message: err
                });
            }
            else{
                console.log(results._id);
                res.status(200).json({
                    message: "Add Pokemon : "+results._id, 
                });
            }
        }
    );
})

app.listen(8075);