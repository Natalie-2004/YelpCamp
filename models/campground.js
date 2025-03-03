
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // shortcut for 'mongoose.Schema'

const CampgroundSchema = new Schema ({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    // campground is one-to-many relationship with reviews
    // the objectId comes from the Review model
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model('Campground', CampgroundSchema);