const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehiculeSchema = new Schema({
  name_vehicule: {
    type: String,
    required: true
  },
  type_vehicule: {
    type: String,
    required: true
  },
  matricule: {
    type: String,
    required: true
  }
}, { timestamps: true });

const vehicule = mongoose.model('vehicule', vehiculeSchema);
module.exports = vehicule;
