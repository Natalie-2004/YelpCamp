const { ref } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         body:
 *           type: string
 *         rating:
 *           type: number
 *         author:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             username:
 *               type: string
 */
const reviewSchema = new Schema ({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model("Review", reviewSchema);