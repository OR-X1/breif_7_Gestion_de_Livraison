const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin_geniraleSchema = new Schema({
  name_admin: {
    type: String,
    required: true
  },
  lastname_admin: {
    type: String,
    required: true
  },
  email_admin: {
    type: String,
    required: true
  },
  password_admin: {
    type: String,
    required: true
  }
}, { timestamps: true });

const admin = mongoose.model('admin', admin_geniraleSchema);
module.exports = admin;
