/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API endpoints for managing reviews
 */

const express = require('express');
// add this if require accessing more params defined at app.js, i.e. id
const router = express.Router({mergeParams: true});
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');

// review fn on show page -> need campground id to associate it with relevant reviews
/**
 * @swagger
 * /campgrounds/{id}/reviews:
 *   post:
 *     summary: Create a new review for a campground
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the campground to create a review for
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid input
 */
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

//delete single review
/**
 * @swagger
 * /campgrounds/{id}/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a specific review from a campground
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the campground
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       403:
 *         description: Unauthorized or forbidden action
 *       404:
 *         description: Review or campground not found
 */
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
