const { required } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 */
const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})

// addon unique username and password to userschema 
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);