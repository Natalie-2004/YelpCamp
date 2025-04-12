const express = require('express');
const routers = express.Router();
const User = require('../models/user.js');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users.js');

routers.get('/register', users.renderRegister)

routers.post('/register', catchAsync(users.registerUser))

routers.get('/login', users.renderLogin)

// https://www.passportjs.org/packages/passport-local/
// storeReturnTo saves the returnTo value from session to res.locals,
// as after login req.session will be clear and now able to use preserved value to redirect
routers.post('/login', storeReturnTo, 
    passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), 
    users.loginUser
);

routers.get('/logout', users.logoutUser);

module.exports = routers;
