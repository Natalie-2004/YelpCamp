const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // default port

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
})

const seedDb = async() => {
    await Campground.deleteMany({});
    const c = new Campground({
        title: 'purple field'
    });
    await c.save();
}

seedDb();