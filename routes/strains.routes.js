const express = require ('express');
const router = express.Router();
const axios =  require('axios')
 
const Strains = require('../models/Strains.model');
const User = require('../models/User.model');

const key = '920feeb76bmshc18b7852a84934dp1f3ea5jsn504297b8b9da'
const host = 'weed-strain1.p.rapidapi.com'

//find all Strains
router.get('/', (req, res, next) => {

  axios.get('https://weed-strain1.p.rapidapi.com/', {
    params: {
      ordering: '-strain'
    },
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': host
    }
  })
  .then(axiosResponse => {
    console.log(axiosResponse.data)
    res.json(axiosResponse.data)
  })
  .catch(axiosError => res.send(axiosError))

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

  //  //find strain by type
  // router.get('/type', (req, res, next) => {
  //   Strains.find({
  //     strainType: req.body.searchTerm
  //   })
  //   .then((foundStrains) => {
  //     res.json(foundStrains)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // })

//find strain by id
  router.get('/:id', (req, res, next) => {
    axios.get('https://weed-strain1.p.rapidapi.com/', {
      params: {
        id: req.params.id
      },
      headers: {
        'X-RapidAPI-Key': key,
        'X-RapidAPI-Host': host
      }
    })  
      .then((foundStrainRes) => {
        console.log(foundStrainRes.data)
        res.json(foundStrainRes.data)
      })
      .catch((err) => {
      console.log(err)
      })
   
    


  })
//Find strain by effect
      // router.get('/goodEffects', (req, res, next) => {
      //   Strains.find({
      //     goodEffects: req.body.searchTerm
      //   })
      //   .then((foundStrains) => {
      //     res.json(foundStrains)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
      // })

      router.get('/findFavorites', (req, res, next) => {

        Promise.all([
          User.findById(req.payload._id).populate('favorites'),
          axios.get('https://weed-strain1.p.rapidapi.com/', {
            params: {
              ordering: '-strain'
            },
            headers: {
              'X-RapidAPI-Key': key,
              'X-RapidAPI-Host': host
            }
          })
        ])
          
          .then(([foundFavorites, strainsDataArray]) => {

            const myFavoritesWithData = foundFavorites.map(fav => {
              const found = strainsDataArray.data.find(s => s.id === Number(fav.strainsId))
              return {
                ...found,
                ...fav
              }
            })
            console.log(myFavoritesWithData)
            res.send(myFavoritesWithData)
          }) 
          .catch((err) => {
            console.log(err)
          })
      })

      router.post('/:strainId/add-favorite', (req, res, next) => {

        const { strainId } = req.params
        
        Strains.create({
          user: req.payload._id,
          strainsId: strainId
        })
          .then(createdStrain => {
            console.log(createdStrain)
            return User.findByIdAndUpdate(req.payload._id, {
              $push: {
                favorites: createdStrain._id
              }
            })
          })
          .then(updatedUser => {
            console.log(updatedUser)
            res.send(updatedUser)
          })
          .catch(err => res.send(err))

      })
module.exports = router;




    
   