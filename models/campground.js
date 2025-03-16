
const mongoose = require('mongoose');
const Review = require('./review')
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
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

CampgroundSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await Review.deleteMany({
            // the id for each review is somewhere at the document's reviews array
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);