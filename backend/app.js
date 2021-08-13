const express = require ('express');
const mongoose = require('mongoose');


const userRoutes = require('./routes/user');

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://tweedia:<Moshimoshi2204%2A>@cluster0.zl68j.mongodb.net/PiiquanteDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});
  
app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req,res) => {
    res.json ({ message: 'Votre requête a bien été reçue! '});
});

app.use((req, res, next) => {
    console.log('Réponse envoyée avec succès !');
  });


  
app.use('/api/auth', userRoutes);


module.exports = app;
