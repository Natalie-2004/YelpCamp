const express = require('express')
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const { campgroundSchema } = require('./schemas.js');
const Review = require('./models/review.js');

const ExpressError = require('./utilities/ExpressError');
const catchAsync = require('./utilities/catchAsync');
const Campground = require('./models/campground');
const campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // default port

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parse request body back
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // parse in query string
app.use(express.static(path.join(__dirname))); // server static file for favicon
app.engine('ejs', ejsMate);

// middleware validation handler
const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const mess = error.details.map(e => e.message).join(',');
        throw new ExpressError(mess, 400);
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.render('home')
})

// index page
app.get('/campgrounds', catchAsync(async (req, res, next) => {
    const campgrounds = await Campground.find({});
    // pass campgrounds to views/campgrounds/index.ejs
    res.render('campgrounds/index', { campgrounds });
}))

// new page to add new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', validateCampground, catchAsync(async (req, res) => {
    // by default .body is empty
    // .Campground since it's grouped at ejs
    const campgroundNew = new Campground(req.body.campground);
    await campgroundNew.save();
    res.redirect(`/campgrounds/${campgroundNew._id}`);
}))

// show page -> ':' have the lowest priority at the same route 
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground });
}))

// edit page -> find and enter the target page to update
app.get('/campgrounds/:id/edit', validateCampground, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}))

// review fn on show page -> need campground id to associate it with relevant reviews
app.post('/campgrounds/:id/reviews', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

// update database, send whenever the form is submitted
app.put('/campgrounds/:id', validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground,
    }, {
        new: true
    })
    res.redirect(`/campgrounds/${campground._id}`);
}))

// delete a specific campground through id searching
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('PAGE NOT FOUND', 404));
})

// generic error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Oh No! Something went wrong!'
    }
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('Servering on port 3000')
})