const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chauffeurSchema = new Schema({
  name_chauffeur: {
    type: String,
    required: true
  },
  lastname_chauffeur: {
    type: String,
    required: true
  },
  email_chauffeur: {
    type: String,
    required: true
  },
  password_chauffeur: {
    type: String,
    required: true
  },  
  created_at_chauffeur: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { timestamps: true });

const chauffeur = mongoose.model('chauffeur', chauffeurSchema);
module.exports = chauffeur;
