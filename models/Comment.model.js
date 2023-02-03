const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userName: String,
    posts: String,
    // Rating:  
  });
  
 
module.exports = Comment;