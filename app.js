const express = require('express')
const path = require('path');

const mongoose = require('mongoose');
const Campground = require('./models/campground');

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
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home')
})

// index page
app.get('/campgrounds', async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        // pass campgrounds to views/campgrounds/index.ejs
        res.render('campgrounds/index', {campgrounds});
    } catch (e) {
        console.log(e);
    }
})

// new page to add new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', async (req, res) => {
    // by default .body is empty
    // .Campground since it's grouped at ejs
    const campgroundNew = new Campground(req.body.campground);
    await campgroundNew.save();
    res.redirect(`/campgrounds/${campgroundNew._id}`);
})

// show page -> ':' have the lowest priority
app.get('/campgrounds/:id', async (req, res) => {
    try {
        const campgroundId = await Campground.findById(req.params.id);
        res.render('campgrounds/show', {campgroundId});
    } catch (e) { 
        console.log(e);
    }
})

app.listen(3000, () => {
    console.log('Servering on port 3000')
})