const express = require('express')
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');

// group all the common routes together
router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgrounds.create))

// new page, need to go before show page route
router.get('/new', isLoggedIn, campgrounds.new);

// show page -> ':' have the lowest priority at the same route
// update database, send whenever the form is submitted
// delete a specific campground through id searching
router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.update))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete))

// edit page -> find and enter the target page to update
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.edit));

module.exports = router;