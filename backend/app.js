const express = require ('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');


require('dotenv').config()
const Database = process.env;



const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://tweedia:moshi33@cluster0.zl68j.mongodb.net/Database?retryWrites=true&w=majority";
//const client = new MongoClient
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.error(error));
//client.connect(err => {
//  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
//  client.close();
//});



const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  /*
  app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
  });

  app.use((req, res, next) => {
    res.status(201);
    next();
  });

  
  app.use((req, res, next) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
    next();
  });
  
  app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });
    */

app.use(express.json());
app.use(bodyParser.json());




app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);



module.exports = app;
