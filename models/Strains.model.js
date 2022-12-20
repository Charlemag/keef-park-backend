const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const strainsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  strainsId: String
});

const Strains = mongoose.model('Strains', strainsSchema);

module.exports = Strains;