const express = require ('express');
const router = express.Router();
const Review = require('../models/Review.model');

router.post('/posts/:postId/review', (req, res, next) => {
    const { postId } = req.params;
    const { author, content } = req.body;
   
    let user;
   
    User.findOne({ username: author })
      .then(userDocFromDB => {
        user = userDocFromDB;
   
        if (!userDocFromDB) {
          return User.create({ username: author });
        }
      })
      .then(newUser => {
 
        Post.findById(postId)
        .then(dbPost => {
          let newReview;
   

          if (newUser) {
            newReview = new Review({ author: newUser._id, content });
          } else {
            newReview = new Review({ author: user._id, content });
          }

          newReview
          .save()
          .then(dbReview => {

            dbPost.comments.push(dbReview._id);
   

            dbPost
              .save()     
              .then(updatedPost => res.redirect(`/posts/${updatedPost._id}`))
          });
        });
      })
      .catch(err => {
        console.log(`Error while creating the comment: ${err}`);
        next(err);
      });
  });
   
  module.exports = router;




