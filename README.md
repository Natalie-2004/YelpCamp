# Yelp Camp 🏕️ (v8)

## Contents 🌈

- [Yelp Camp 🏕️ (v8)](#yelp-camp-️-v8)
  - [Contents 🌈](#contents-)
  - [1. Features and Functionality ✨](#1-features-and-functionality-)
    - [Update Log](#update-log)
      - [1.1 Updates](#11-updates)
      - [1.2 Updates](#12-updates)
      - [1.3 Updates](#13-updates)
      - [1.4 Updates](#14-updates)
      - [1.5 Updates](#15-updates)
      - [1.6 Updates](#16-updates)
      - [1.7 Updates](#17-updates)
      - [1.8 Updates](#18-updates)
  - [2. Skill Stacks 🛠️](#2-skill-stacks-️)
  - [3. Setup Instructions ⚙️](#3-setup-instructions-️)
  - [4. Seeding the Database 🌱](#4-seeding-the-database-)
  - [5. Usage 🚀](#5-usage-)

## 1. Features and Functionality ✨

### Update Log

#### 1.1 Updates

- Create new campgrounds model with a title and location
- View a list of all campgrounds
- Edit existing campgrounds
- Delete campgrounds

#### 1.2 Updates

- Style index, show, edit and new campground page using bootstrap5
- Introduce random images, pricing and description to database
- Refactor Boilderplate by isolating footer and navBar at separate files
- Custom cursor and favicon

#### 1.3 Updates

- Implement Client and Server Side validation to enhance user experience
- Handle basic async function error and develop consistence error display template
- Customise ExpressError handler to standardise error handling across the app
- Integrate Joi schemas as middleware to validate incoming request data

#### 1.4 Updates

- Implement Review Model to allow user leave their universal ratings and feedbacks for a  campground particularly
- Display users' reviews on show page
- Validating reviews at both server and client side
- Handling deletion of singular review using button and multiple reviews by delete a whole campground body

#### 1.5 Updates

- Refactor app.js to move RESTful routes into independent route folder
- Isolating routes for both campground and review models into separate files
- Serve static assets from public folder for user interface
- Enable session management and cookie configuration
- Integrate flash section to capturing success and error messages and alert on client side

#### 1.6 Updates

- Create User model for handle users' registration, login and logout process using passport.js
- Implement express routes for users' requests
- Restrict unlogin-users from modifying, commenting at campgrounds
- Use middleware to execute login logic and preserve url unlogin-users visited previously after being redirected to login site
- Refactor narBar to carry out functionalities such as login, logout and register
- Decorate corresponding forms to collect users credentials such as usernames, emails and passwords for verification
- Limit client-side access to unauthorised users
- Enhance permission at both Campground and Review models
- Display authors for campground and reviews

#### 1.7 Updates

- Refactor and centralise routes (campgrounds, reviews, users) to adapt MVC pattern
- Implement Multer for handling multipart/form-data in Express
- Register and configure Cloudinary for images, storing cloud images at database, and ensuring synchronization between Cloudinary and MongoDB
- Enable image uploads and deletion on client-side
- Display uploaded images dynamically in a carousel UI on the client-side
- Enhance UI for a better user experience

#### 1.8 Updates

- Implement geocoding for campground locations and integrated GeoJSON for spatial data handling
- Display interactive maps centered on individual campgrounds
- Create cluster maps to group nearby campgrounds, which adapted from MapBox
- Fix seed data issues to ensure accurate map rendering, generating more campgrounds
- Style campground pages and user pages, customise map popups for better user interaction
- Ensure app free from common attacks such as NoSQL injection, XSS etc with Helmet
- Use mongo for session store

## 2. Skill Stacks 🛠️

- Frontend: HTML/CSS/Javascript, EJS
- Backend: JavaScript, Node.js
- Database: Mongoose
- Library/Model: MVC, BootStrap, Express.js, Mongoose
- Platform: Git, VS Code, WebStorm

## 3. Setup Instructions ⚙️

1. Clone the repo:
   `git clone https://github.com/Natalie-2004/yelp-camp.git`
   `cd yelp-camp`
2. Install dependencies:
   `npm install`
3. Start the MongoDB server: (Ensure MongoDB is running on your machine)

   `mongosh mongodb://localhost:27017/yelp-camp`
4. Open another terminal and run the line:
   `node app.js`
5. View the live server on any browser:
   `http://localhost:3000`

## 4. Seeding the Database 🌱

To seed the database with random campgrounds:
`node seeds/index.js`

## 5. Usage 🚀

- Navigate to `/campgrounds` to view all campgrounds seeded.
- Use the "New Campground" button to create customise Campground.
- Interact campground with options to view details, edit, or delete.
- Leave rating and review under a campground to publics.



