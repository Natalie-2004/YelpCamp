const express = require('express')
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');

// index page
router.get('/', catchAsync(campgrounds.index));

// new page
router.get('/new', isLoggedIn, campgrounds.new);

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.create))

// show page -> ':' have the lowest priority at the same route 
router.get('/:id', catchAsync(campgrounds.show));

// edit page -> find and enter the target page to update
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.edit));

// update database, send whenever the form is submitted
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.update));

// delete a specific campground through id searching
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

module.exports = router;