const Campground = require('../models/campground');
const Review = require('../models/review.js');

module.exports.createReview = async (req, res) => {
    // don't have access to campground id at review routes at express routes
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    // Ensure the author is set:
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully posted a new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    // finds the campgroundId and remove the reviewId from its reviews array
    await await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // finds the review and remove from the database
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted a review!');
    res.redirect(`/campgrounds/${id}`);
}