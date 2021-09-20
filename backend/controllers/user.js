//bcrpyt permet un cryptage sécurisé
const bcrypt = require('bcrypt');
//jwt permet l'échange sécurisé de jetons (tokens)
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// Creation fonctions signup et login

// Créer compte utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Execution de l'algorithme de hashage
    .then(hash => {
        const user = new User ({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
// Récuperation hash du mdp qui va sauvegarder dans un nouvel user pour ensuite être enregistré dans la db
    })
    .catch(error => res.status(500).json({ error }));

};

// Connexion à un compte utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        // Si l'adresse mail correspond à un user déjà existant
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            // Si le mot de pass et le hash correspondent
            res.status(200).json({
              userId: user._id, // Envoie réponse 200 contenant l'ID user et un token
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };