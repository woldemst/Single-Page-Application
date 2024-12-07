const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: false },
    location: {
        lat: { type: Number, required: false },
        lng: { type: Number, required: false },
    },
    image: { type: String, required: false },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' } // ref: establish connection between two schema 
});

module.exports = mongoose.model('Place', placeSchema);