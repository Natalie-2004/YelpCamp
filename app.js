// environment variable for development
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const mongoUrl = process.env.MONGO_URL;

const express = require('express')
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const ExpressError = require('./utilities/ExpressError');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const Users = require('./models/user.js');
const mongoSanitise = require('express-mongo-sanitize');
const helmet = require('helmet');

const campgroundsRoutes = require('./routers/campgrounds.js');
const reviewsRoutes = require('./routers/reviews.js');
const usersRoutes = require('./routers/users.js');

// mongodb://localhost:27017/yelp-camp
mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
})

// app config
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

// parse request body back
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // parse in query string
app.use(express.static(path.join(__dirname, 'public'))); // server static file for favicon
app.use(flash());
app.use(mongoSanitise());
app.use(helmet());

const store = MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/yelp-camp',
    secret: 'password',
    touchAfter: 24 * 3600, // time in seconds
    crypto: {
        secret: 'password'
    }
});

store.on('error', function (e) {
    console.log('SESSION STORE ERROR', e);
});

const sessionConfig = {
    store,
    name: 'session',
    secret: 'password',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://res.cloudinary.com/dduweiukj/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// session need to be used before passport
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Users.authenticate()));
// get user into the session
passport.serializeUser(Users.serializeUser());
// get user out of the session
passport.deserializeUser(Users.deserializeUser());

// capture flash success message among routers on every single request globally
app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);
app.use('/', usersRoutes);

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