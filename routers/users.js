const express = require('express');
const routers = express.Router();
const User = require('../models/user.js');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

routers.get('/register', (req, res) => {
    res.render('users/register');
})

routers.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registerUser = await User.register(newUser, password);
        // login user immediately after registration success -> authenticate is not suitable as we obviously can't access new user's identification
        // this is callback fn
        req.login(registerUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        });
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/register');
    }
}))

routers.get('/login', (req, res) => {
    res.render('users/login');
})

// https://www.passportjs.org/packages/passport-local/
// storeReturnTo saves the returnTo value from session to res.locals,
// as after login req.session will be clear and now able to use preserved value to redirect
routers.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', `Welcome back! ${req.user.username}`);
    res.redirect(res.locals.returnTo || '/campgrounds');
})

routers.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        } else {
            req.flash('success', 'Logout! Good day!');
            res.redirect(`/campgrounds`);
        }
    })
})

module.exports = routers;
