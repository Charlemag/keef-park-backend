const express = require ('express');
const router = express.Router();
const Review = require('../models/Review.model');
const Strains = require('../models/Strains.model');

router.post('/:strainsId/review-create', (req, res, next) => {
    const { author, title, content } = req.body;

    Review.create({ author, title, content })
      .then(dbPost => {

    Strains.findByIdAndUpdate(req.params.strainsId, { $push: { reviews: dbPost._id } });
      })

      .catch(err => {
        console.log(`Err while creating the post in the DB: ${err}`);

      });
      
   

      
  });

 module.exports = router;




