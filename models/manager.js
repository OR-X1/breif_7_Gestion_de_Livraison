const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema({
  name_manager: {
    type: String,
    required: true
  },
  lastname_manager: {
    type: String,
    required: true
  },
  email_manager: {
    type: String,
    required: true
  },
  password_manager: {
    type: String,
    required: true
  },  
  created_at_manager: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { timestamps: true });

const manager = mongoose.model('manager', managerSchema);
module.exports = manager;
