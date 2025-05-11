const User = require('../models/user.js');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.registerUser = async (req, res) => {
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
}

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', `Welcome back! ${req.user.username}`);
    res.redirect(res.locals.returnTo || '/campgrounds');
}

module.exports.logoutUser = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        } else {
            req.flash('success', 'Logout! Good day!');
            res.redirect(`/campgrounds`);
        }
    })
}
