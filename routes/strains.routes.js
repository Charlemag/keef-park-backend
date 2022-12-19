const express = require ('express');
const router = express.Router();
 
const Strains = require('../models/Strains.model')

//find all Strains
router.get('/', (req, res, next) => {
  Strains.find()
  // .populate('reviews')
    .then((foundStrains) => {
      res.json(foundStrains)
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/', (req, res, next) => {
  const { strain, strainType, goodEffects } = req.body;

  //Create a new strain
  Strains.create(
    { 
    strain, 
    strainType, 
    goodEffects
  }
    )
   .then((newStrain) => {
    res.json(newStrain)
   }) 
     .catch((err) => {
       console.log(err)
     })
   })

   //find strain by type
  router.get('/type', (req, res, next) => {
    Strains.find({
      strainType: req.body.searchTerm
    })
    .then((foundStrains) => {
      res.json(foundStrains)
    })
    .catch((err) => {
      console.log(err)
    })
  })


//find strain by id
  router.get('/:id', (req, res, next) => {
    Strains.findById(req.params.id)
      // .populate('reviews')    
      .then((foundStrain) => {
      res.json(foundStrain)
      })
      .catch((err) => {
      console.log(err)
      })
   
    //Find strain by effect
      router.get('/goodEffects', (req, res, next) => {
        Strains.find({
          goodEffects: req.body.searchTerm
        })
        .then((foundStrains) => {
          res.json(foundStrains)
        })
        .catch((err) => {
          console.log(err)
        })
      })


  })

module.exports = router




    
   