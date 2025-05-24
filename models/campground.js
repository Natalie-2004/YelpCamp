
const mongoose = require('mongoose');
const Review = require('./review');
const { campgroundSchema } = require('../schemas');
const Schema = mongoose.Schema; // shortcut for 'mongoose.Schema'

// virtual property for image
// no need to store at mongoose
const ImageSchema = new Schema ({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_300');
});

// toJSON is a method of mongoose.Schema
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema ({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
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
}, opts);

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

// properties : {
//     popUpMarkup: 'anchor tag',
// }
CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.location}</p>
    `
});

module.exports = mongoose.model('Campground', CampgroundSchema);