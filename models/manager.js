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
  }
  
}, { timestamps: true });

const manager = mongoose.model('manager', managerSchema);
module.exports = manager;
