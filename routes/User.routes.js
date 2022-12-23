const express = require ('express');
const router = express.Router();
const User = require('../models/User.model')
const axios =  require('axios')

const { isAuthenticated } = require('../middleware/jwt.middleware');
const { restart } = require('nodemon');
const Strains = require('../models/Strains.model');

const key = '920feeb76bmshc18b7852a84934dp1f3ea5jsn504297b8b9da'
const  host = 'weed-strain1.p.rapidapi.com'

//Save favorite Strains in user profile
router.post('/:strainId/add-favorite', isAuthenticated, (req, res, next) => {

  const { strainId } = req.params
  axios.get(`https://weed-strain1.p.rapidapi.com/`, {
    params: {id: `${strainId}`}, 
    headers: {
    'X-RapidAPI-Key': key,
    'X-RapidAPI-Host': host
}

}) .then((foundStrain) => {console.log(foundStrain.data[0])
 
  return Strains.create({
    strain:foundStrain.data[0].strain ,
    strainType:foundStrain.data[0].strainType ,
    goodEffects: foundStrain.data[0].goodEffects ,
    thc: foundStrain.data[0].thc
  }) .then(createdStrain => {
    console.log(createdStrain)
    User.findByIdAndUpdate(
      req.payload._id,
      { $addToSet: { favorites: createdStrain._id } },
      { new: true }) .then(updatedUser => console.log(updatedUser))

  }).catch(err  => console.log(err)) 
    
  
// res.json(foundStrain.data[0])
})
})
    // .catch((err) => res.send(err));

  // User.findByIdAndUpdate(
  //   req.payload._id,
  //   { $addToSet: { favorites: strainId } },
  //   { new: true }
  // )
  //   .then((favoriteStrain) => {
  //     console.log(favoriteStrain)
  //     res.redirect('/user')
  //   })
  //   .catch((err) => res.send(err));
  //   router.get('/updateProfile', isAuthenticated, (req, res, next) => {
  //     User.findById(req.payload._id).then(foundUser => {
  //       console.log(foundUser)
  //     })
  //   })  
  // })

  module.exports  = router;

  // axios.get('https://weed-strain1.p.rapidapi.com/', {
  //   params: {
  //     ordering: '-strain'
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': key,
  //     'X-RapidAPI-Host': host
  //   }