const express = require('express');
const routers = express.Router();
const User = require('../models/user.js');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');

routers.get('/register', (req, res) => {
    res.render('users/register');
})

routers.post('/register', catchAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registerUser = await User.register(newUser, password);
        // console.log(registerUser);
        req.flash('success', 'Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
    } catch (error) {
        req.flash('error', error.message);
        return res.redirect('/register');
    }
}))

routers.get('/login', (req, res) => {
    res.render('users/login');
})

// https://www.passportjs.org/packages/passport-local/
routers.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    const { username } = req.body;
    req.flash('success', `Welcome back! ${username}`);
    res.redirect('/campgrounds');
})

module.exports = routers;
