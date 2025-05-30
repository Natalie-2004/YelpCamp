/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users.js');

/**
 * @swagger
 * /register:
 *   get:
 *     summary: Render registration page
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Registration page rendered successfully
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
 */
router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.registerUser));

// https://www.passportjs.org/packages/passport-local/
// storeReturnTo saves the returnTo value from session to res.locals,
// as after login req.session will be clear and now able to use preserved value to redirect
/**
 * @swagger
 * /login:
 *   get:
 *     summary: Render login page
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Login page rendered successfully
 *       '500':
 *         description: Internal server error
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '401':
 *         description: Unauthorized – Invalid credentials
 *       '500':
 *         description: Internal server error
 */
router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnTo, 
        passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), 
        users.loginUser
    )


/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Log out the currently logged-in user
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: User logged out successfully
 *       '401':
 *         description: Unauthorized – User is not logged in
 *       '500':
 *         description: Internal server error
 */
router.get('/logout', users.logoutUser);

module.exports = router;
