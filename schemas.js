const BaseJoi = require('joi');
const { validate } = require('./models/user');
const sanitizeHTML = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML characters'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) {
                    return helpers.error('string.escapeHTML', { value });
                }
            }
        }
    }
})

const Joi = BaseJoi.extend(extension);

// pattern for js object, use to validate request body
const campgroundSchema = Joi.object({
        campground: Joi.object({
            title: Joi.string().required().escapeHTML(),
            price: Joi.number().required().min(0),
            // images: Joi.string().required(),
            location: Joi.string().required().escapeHTML(),
            description: Joi.string().required().escapeHTML()
        }).required(),
        deleteImages: Joi.array()
    });

module.exports.campgroundSchema = campgroundSchema;

const reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        body: Joi.string().required().escapeHTML()
    }).required()
})

module.exports.reviewSchema = reviewSchema;

