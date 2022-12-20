const express = require ('express');
const router = express.Router();
const Review = require('../models/Review.model');
const Strains = require('../models/Strains.model');

router.post('/:strainsId/review-create', (req, res, next) => {
    const { title, content } = req.body;
    const author = req.payload._id;
    const strainsId = req.params.strainsId

    Review.create({ author, title, content, strainsId })
      .then(createdReview => {
        res.send(createdReview)
      })
      .catch(err => {
        res.send(`Err while creating the post in the DB: ${err}`);
      });
  });

  router.get('/:strainsId/all-review', (req, res, next) => {
    const strainsId = req.params.strainsId;
   //get strainsId from route params
    //use review model (Review.find method) to get all reviews for that strain from database
    //res.send reviews back to front end
    Review.find({
      strainsId
    })
    .then(allReview => { 
      res.send(allReview);
    })
    .catch(err => res.send(err));
  })
    //delete review
    router.get('/:strainsId/delete', (req, res, next) => {
      const strainsId = req.params.strainsId;
      Review.findByIdAndDelete(strainsId)
      .then(deletedReview => {
        res.send(deletedReview);
      })
      .catch(err => res.send(err));
    });

 module.exports = router;