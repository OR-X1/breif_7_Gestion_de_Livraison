const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responsableLivraisonSchema = new Schema({
  name_responsableL: {
    type: String,
    required: true
  },
  lastname_responsableL: {
    type: String,
    required: true
  },
  email_responsableL: {
    type: String,
    required: true
  },
  password_responsableL: {
    type: String,
    required: true
  },  
  created_at_responsableL: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { timestamps: true });

const responsableLivraison = mongoose.model('responsableLivraison', responsableLivraisonSchema);
module.exports = responsableLivraison;
