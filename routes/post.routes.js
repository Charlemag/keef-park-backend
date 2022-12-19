const express = require ('express');
const router = express.Router();
const Review = require('../models/Review.model');

router.post('/post-create', (req, res, next) => {
    const { author, title, content } = req.body;

    Post.create({ author, title, content })
      .then(dbPost => {

        return User.findByIdAndUpdate(author, { $push: { posts: dbPost._id } });
      })
      .then(() => res.redirect('/post')) 
      .catch(err => {
        console.log(`Err while creating the post in the DB: ${err}`);
        next(err);
      });
      
      
      router.get('/posts', (req, res, next) => {
        Post.find()
        .populate('author')
          .then(dbPosts => {
            console.log('Posts from the DB: ', dbPosts);
            res.render('posts/list', { posts: dbPosts });
          })
          .catch(err => {
            console.log(`Err while getting the posts from the DB: ${err}`);
            next(err);
          }

      
  });

 module.exports = post;


