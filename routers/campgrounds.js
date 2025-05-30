/**
 * @swagger
 * tags:
 *   name: Campgrounds
 *   description: API endpoints for managing campgrounds
 */

const express = require('express')
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary'); // automatically look for index.js file
const upload = multer({ storage });

// group all the common routes together
/**
 * @swagger
 * /campgrounds:
 *   get:
 *     summary: Get a list of all campgrounds
 *     tags: [Campgrounds]
 *     responses:
 *       200:
 *         description: A list of campgrounds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Campground'
 *   post:
 *     summary: Create a new campground
 *     tags: [Campgrounds]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Campground'
 *     responses:
 *       201:
 *         description: Campground created successfully
 */
router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.create));

// new page, need to go before show page route
/**
 * @swagger
 * /campgrounds/new:
 *   get:
 *     summary: Render the form to create a new campground
 *     tags: [Campgrounds]
 *     responses:
 *       200:
 *         description: Render the new campground form
 */
router.get('/new', isLoggedIn, campgrounds.new);

// search bar
/**
 * @swagger
 * /campgrounds/search:
 *   get:
 *     summary: Search for campgrounds by title or location
 *     tags: [Campgrounds]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term for campground title or location
 *     responses:
 *       200:
 *         description: A list of campgrounds matching the search term (Title or Location)
 */
router.get('/search', catchAsync(campgrounds.search));

// show page -> ':' have the lowest priority at the same route
// update database, send whenever the form is submitted
// delete a specific campground through id searching
/**
 * @swagger
 * /campgrounds/{id}:
 *   get:
 *     summary: Get a specific campground by ID
 *     tags: [Campgrounds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the campground to retrieve
 *     responses:
 *       200:
 *         description: A specific campground
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campground'
 *   put:
 *     summary: Update a specific campground by ID
 *     tags: [Campgrounds]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the campground to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Campground'
 *     responses:
 *       200:
 *         description: Campground updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 campground:
 *                   $ref: '#/components/schemas/Campground'
 *   delete:
 *     summary: Delete a specific campground by ID
 *     tags: [Campgrounds]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the campground to delete
 *     responses:
 *       200:
 *         description: Campground deleted successfully
*/
router.route('/:id')
  .get(catchAsync(campgrounds.show))
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.update))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete))

// edit page -> find and enter the target page to update
/**
* @swagger
 * /campgrounds/{id}/edit:
 *   get:
 *     summary: Render the form to edit a specific campground by ID
 *     tags: [Campgrounds]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the campground to edit
 *     responses:
 *       200:
 *         description: Render the edit campground form
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campground'
 */
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.edit));

module.exports = router;