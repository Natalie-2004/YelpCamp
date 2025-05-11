const express = require('express');
// add this if require accessing more params defined at app.js, i.e. id
const router = express.Router({mergeParams: true});
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');

// review fn on show page -> need campground id to associate it with relevant reviews
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//delete single review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
