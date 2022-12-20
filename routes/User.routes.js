const express = require ('express');
const router = express.Router();
const User = require('../models/User.model')

const { isAuthenticated } = require('../middleware/jwt.middleware');

//Save favorite Strains in user profile
router.post('/:strainId/add-favorite', isAuthenticated, (req, res, next) => {

  const { strainId } = req.params

  User.findByIdAndUpdate(
    req.payload._id,
    { $addToSet: { favorites: strainId } },
    { new: true }
  )
    .then((favoriteStrain) => {
      console.log(favoriteStrain)
      res.redirect('/user')
    })
    .catch((err) => res.send(err));
     
  })

  module.exports  = router;
