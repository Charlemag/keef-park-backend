const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Strains'}],

  name: String,

  // reviews:[{ type: Schema.Types.ObjectId, ref:'reviews'}]
},
  
);

const User = model('User', userSchema);

module.exports = User;
