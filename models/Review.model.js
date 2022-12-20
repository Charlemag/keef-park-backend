const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
  
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: String,
    content: String,
    strainsId: String
});


const Review = model("Review", reviewSchema);

module.exports = Review;