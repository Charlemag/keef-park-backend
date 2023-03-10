const express = require('express');

const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

const { isAuthenticated } = require('../middleware/jwt.middleware');

//const { signupController, loginController } = require('../controllers/auth.controllers');


const router = express.Router();

router.post('/signup', (req, res, next) => {

  const { email, password, name } = req.body;

  if(!email || !password || !name){
    return res.json({
      error: {
        message: 'Missing email, name, or password'
      }
    });
  }

  //optional guard statement to check password strength

  bcryptjs.hash(password, 10)
    .then(hashedPassword => {
      
      return User.create({
        email,
        name,
        password: hashedPassword
      })

    })
    .then(createdUser => {
      res.json(createdUser)
      //optionally we could give a JSON WEB TOKEN right here
    })
    .catch(err => res.send(err));

});

router.post('/login', (req, res, next) => {

  const { email, password } = req.body;

  if(!email || !password){
    return res.json({
      error: {
        message: 'Missing email or password'
      }
    })
  }

  let myUser;
  User.findOne({ email })
    .then(foundUser => {
      if(!foundUser){
        return Promise.reject('Invalid email or password')
      }
      myUser = foundUser;
      return bcryptjs.compare(password, foundUser.password)
    })
    .then(isValidPassword => {
      if(!isValidPassword){
        return Promise.reject('Invalid email or password')
      }
      
      const payload = {
        _id: myUser._id,
        name: myUser.name,
        email: myUser.email
      };

      const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        { algorithm: 'HS256', expiresIn: '120h' }
      );

      res.json({
        authToken: authToken
      });


    })
    .catch(err => res.send(err))

});

router.get('/updateProfile', isAuthenticated, (req, res, next) => {
  User.findById(req.payload._id).then(foundUser => {
    console.log(foundUser)
    res.json(foundUser)
  })
})  

router.put('/updateProfile', isAuthenticated, (req, res, next) => {
  const userId = req.payload._id
  const { email, name } = req.body
  console.log(email,name)

  User.findOneAndUpdate(
    { _id: userId },
    { name: name, email: email },
    { new: true }
  )
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.json(error));
})  

router.delete('/updateProfile', isAuthenticated, (req, res, next) => {
  const userId = req.payload._id
  User.findByIdAndDelete(userId).then(deletedUser => {
    console.log(deletedUser)
  })
  .catch(err => console.log(err))
})

router.get('/verify', isAuthenticated, (req, res, next) => {
  console.log(req.payload);
  res.status(200).json(req.payload);
});


module.exports = router;