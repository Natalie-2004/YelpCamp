// to seed database, replace new campgrounds by deteling prev ones

const mongoose = require('mongoose');
const cities_au = require('./cities_au');
const Campground = require('../models/campground');
const {places, descriptors} = require('./seedHelpers');
const { cloudinaryImages } = require('../cloudinary');

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // default port

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected for seeding");
})

// pick rand elem from array
const randArr = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

// async fn returns promise
const seedDb = async() => {
    await Campground.deleteMany({});
    
    for (let i = 0; i < 100; i++) {
        const rand = Math.floor(Math.random() * cities_au.length);
        const price = Math.floor(Math.random() * 500) + 100;
        const long = cities_au[rand].longitude;
        const lat = cities_au[rand].latitude;
        const image = randArr(cloudinaryImages);

        const camp = new Campground({
            author: '67f9da2b6473b64bfc4fadca', // by default set testUser as the admin account
            location: `${cities_au[rand].city}, ${cities_au[rand].state}`,
            title: `${randArr(descriptors)} ${randArr(places)}`,
            images: [image],
            description: `Nestled amidst lush greenery and serene landscapes, this campground offers a perfect escape for nature enthusiasts. With well-maintained sites, modern amenities, and easy access to hiking trails and a tranquil lake, it's an ideal spot for both relaxation and adventure.`,
            price,
            geometry: {
                type: 'Point',
                coordinates: [long, lat]
            }
        })

        // save into database for each separate camp object created
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
})