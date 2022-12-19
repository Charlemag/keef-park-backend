const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const strainsSchema = new Schema({
  strain: String,
  strainType: String,
  goodEffects: String,
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]

});

const Strains = mongoose.model('Strains', strainsSchema);

module.exports = Strains;