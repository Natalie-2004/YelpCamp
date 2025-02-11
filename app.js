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

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/campgrounds', async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render('campgrounds/index', {campgrounds});
    } catch (e) {
        console.log(e);
    }
})

// make a new campground
app.get('/makecampground', async (req, res) => {
    const camp = new Campground({
        title: 'My Backyard',
        price: '100',
        location: '1',
        description: 'cheap camping'
    })
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Servering on port 3000')
})