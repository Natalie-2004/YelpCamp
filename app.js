const express = require('express')
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const campgrounds = require('./routers/campgrounds.js');
const reviews = require('./routers/reviews.js')

mongoose.connect('mongodb://localhost:27017/yelp-camp'); // default port

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')); // server static file for favicon
// parse request body back
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // parse in query string
app.engine('ejs', ejsMate);

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
    res.render('home')
})

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