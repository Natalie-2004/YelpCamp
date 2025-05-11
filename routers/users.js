const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users.js');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser));

// https://www.passportjs.org/packages/passport-local/
// storeReturnTo saves the returnTo value from session to res.locals,
// as after login req.session will be clear and now able to use preserved value to redirect
router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, 
        passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), 
        users.loginUser
    )

router.get('/logout', users.logoutUser);

module.exports = router;
