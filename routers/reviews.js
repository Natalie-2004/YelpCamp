const express = require('express');
// add this if require accessing more params defined at app.js, i.e. id
const router = express.Router({mergeParams: true});
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review.js');
const { isLoggedIn, validateReview } = require('../middleware');

// review fn on show page -> need campground id to associate it with relevant reviews
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    // don't have access to campground id at review routes at express routes
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully post a new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}))

//delete single review
router.delete('/:reviewId', isLoggedIn, catchAsync(async (req, res) => {
    const {id, reviewId} = req.params;
    // finds the campgroundId and remove the reviewId from its reviews array
    await await Campground.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
    // finds the review and remove from the database
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted a review!');
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;
