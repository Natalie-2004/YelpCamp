const Joi = require('joi');
// pattern for js object, use to validate request body
const campgroundSchema = Joi.object({
        campground: Joi.object({
            title: Joi.string().required(),
            price: Joi.number().required().min(0),
            // images: Joi.string().required(),
            location: Joi.string().required(),
            description: Joi.string().required()
        }).required()
    });

module.exports.campgroundSchema = campgroundSchema;

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required()
    }).required()
})

module.exports.reviewSchema = reviewSchema;

