const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const strainsSchema = new Schema({
  Name: String,
  Type: String,
  Description: String,
  Flavour: 'String',
  Symptom: 'String',
  Mood: 'String'

});

const Strains = mongoose.model('Strains', strainsSchema);

module.exports = Strains;