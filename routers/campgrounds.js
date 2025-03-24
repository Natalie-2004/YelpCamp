const express = require('express')
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

// index page
router.get('/', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    // pass campgrounds to views/campgrounds/index.ejs
    res.render('campgrounds/index', { campgrounds });
}))

// new page to add new campground
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
    // by default .body is empty
    // .Campground since it's grouped at ejs
    const campgroundNew = new Campground(req.body.campground);
    campgroundNew.author = req.user._id;
    await campgroundNew.save();
    req.flash('success', 'Successfully post a new campground!');
    res.redirect(`/campgrounds/${campgroundNew._id}`);
}))

// show page -> ':' have the lowest priority at the same route 
router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    // console.log(campground);
    if (!campground) {
        req.flash('error', 'Cannot found such campground!');
        return res.redirect('/campgrounds');
    } else res.render('campgrounds/show', { campground });
}))

// edit page -> find and enter the target page to update
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot found such campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}))

// update database, send whenever the form is submitted
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    // check if currUser is the author of the campground
    const camp = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground,
    }, {
        new: true
    })
    const title = camp.title;
    req.flash('success', `Successfully update the ${title}!`);
    res.redirect(`/campgrounds/${camp._id}`);
}))

// delete a specific campground through id searching
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the campground!');
    res.redirect('/campgrounds');
}))

module.exports = router;