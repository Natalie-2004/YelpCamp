const express = require('express')
const router = express.Router();
const { campgroundSchema } = require('../schemas.js');
const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');

// middleware
// validation handler on server side i.e. using postman
const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const mess = error.details.map(e => e.message).join(',');
        throw new ExpressError(mess, 400);
    } else {
        next();
    }
}

// index page
router.get('/', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    // pass campgrounds to views/campgrounds/index.ejs
    res.render('campgrounds/index', { campgrounds });
}))

// new page to add new campground
router.get('/new', (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', validateCampground, catchAsync(async (req, res) => {
    // by default .body is empty
    // .Campground since it's grouped at ejs
    const campgroundNew = new Campground(req.body.campground);
    await campgroundNew.save();
    req.flash('success', 'Successfully post a new campground!');
    res.redirect(`/campgrounds/${campgroundNew._id}`);
}))

// show page -> ':' have the lowest priority at the same route 
router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', { campground });
}))

// edit page -> find and enter the target page to update
router.get('/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}))

// update database, send whenever the form is submitted
router.put('/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground,
    }, {
        new: true
    })
    res.redirect(`/campgrounds/${campground._id}`);
}))

// delete a specific campground through id searching
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

module.exports = router;