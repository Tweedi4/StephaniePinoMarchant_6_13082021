const sauce = require('../models/sauce');
const fs = require('fs');


// Get specific sauce (id)
exports.getOneSauce = (req, res, next) => {
    sauce.findOne({_id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

// Get all sauce in database
exports.getAllSauces = (req, res, next) => {
    sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
}

// Create Sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

// Modify Sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

// Delete Sauce
exports.deleteSauce = (req, res, next) => {
    sauce.findOne({_id: req.params.id })
    .then(sauce => {
        fs.unlink(`images/${filename}`, () => {
            sauce.deleteSauce({_id: req.params.id})
                .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
                .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
};

//Like Or Dislike
exports.likeOrNot = (req, res, next) => {
    
}