const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    name: String, 
    title: String,
    address: String,
    region: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    bedrooms: Number,
    bathrooms: Number,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price: Number,
    rating: [Number],
    averageRating: Number,
  
})

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;
