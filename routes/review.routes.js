const express = require ('express');
const router = express.Router();
const Review = require('../models/Review.model');


router.post('/review', (req, res, next) => {
    const { author, title, content } = req.body;

    Review.create({ author, title, content })
    .then(response => res.json(response))
    .catch(err => res.json(err));

   

});

module.exports = router;