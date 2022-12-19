const express = require ('express');
const router = express.Router();

const User = require('../models/User.model')

//Create their own strain
// Strains.create(
//     { 
//     strain, 
//     strainType, 
//     goodEffects
//   }
//     )
//    .then((newStrain) => {
//     res.json(newStrain)
//    }) 
//      .catch((err) => {
//        console.log(err)
//      })
//    })

//Save favorite Strains in user.profile
router.post('/:strainId/add-favorite', (req, res, next) => {

    User.findByIdAndUpdate(req.session.user._id, {
      favoriteStrain: {
        strain: req.params.strainId,
   
      }
    }, 
    {new: true}
    )
    .then((updateUser) => {
    
      console.log("This is the updated User", updateUser)
      res.redirect('/user')
    })
    .catch((err) => {
      console.log(err)
    })
  })

