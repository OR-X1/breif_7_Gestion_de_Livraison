const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const livraisantSchema = new Schema({
    date_depart: {
        type: Date,
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
        type: Number,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    distance_km: {
        type: Number,
        required: true
    },
    zone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "disponible"
    }
    
}, { timestamps: true });

const livraisant = mongoose.model('livraisant', livraisantSchema);
module.exports = livraisant;
