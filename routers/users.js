const express = require('express');
const routers = express.Router();
const User = require('../models/user.js');

routers.get('/register', (req, res) => {
    res.render('users/register');
})

routers.post('/register', async (req, res) => {
    res.send(req.body);
})

module.exports = routers;
