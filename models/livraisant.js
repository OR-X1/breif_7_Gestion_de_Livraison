const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const livraisantSchema = new Schema({
    date_depart: {
        type: date,
        required: true
    },
    ville_depart: {
        type: String,
        required: true
    },
    ville_arrive: {
        type: String,
        required: true
    },
    poids: {
        type: String,
        required: true
    },
    prix: {
        type: String,
        required: true
    },
    distance_km: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    livraisant: {
      type: Date,
      required: true,
      default: Date.now
    }
}, { timestamps: true });

const livraisant = mongoose.model('livraisant', livraisantSchema);
module.exports = livraisant;
