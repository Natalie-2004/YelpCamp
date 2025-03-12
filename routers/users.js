const express = require('express');
const routers = express.Router();
const User = require('../models/user.js');
const catchAsync = require('../utilities/catchAsync');

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

module.exports = routers;
