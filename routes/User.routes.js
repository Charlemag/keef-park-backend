// const express = require ('express');
// const router = express.Router();

// const User = require('../models/User.model')


// //Save favorite Strains in user profile
// router.post('/:strainId/add-favorite', (req, res, next) => {
// User.findByIdAndUpdate(
//     req.params.id, 
//     {
//         favoriteStrain: {
//         strain: req.body.strainId,
   
//       }
//     }, 
//     {new: true}
//     )
//     .then((updateUser) => {
//       console.log("This is the updated User", updateUser)
//       res.redirect('/user')
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   })

//   module.exports  = router;
