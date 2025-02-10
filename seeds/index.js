// to seed database, replace new campgrounds by deteling prev ones

const mongoose = require('mongoose');
const cities_us = require('./cities_us');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // default port

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
})

// pick rand elem from array
const randArr = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

// async fn returns promise
const seedDb = async() => {
    await Campground.deleteMany({});
    
    for (let i = 0; i < 50; i++) {
        // get int upto 1000
        const rand = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities_us[rand].city}, ${cities_us[rand].state}`,
            title: `${randArr(descriptors)} ${randArr(places)}`
        })

        // save itno database for each seperate camp object that created
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})