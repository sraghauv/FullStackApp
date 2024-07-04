const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Place'},
    user: { type: mongoose.Schema.Types.ObjectId, required: true},
    booking: { type: mongoose.Schema.Types.ObjectId, required: true },
    comment: String, 
    rating: Number,
    name: String
})

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;