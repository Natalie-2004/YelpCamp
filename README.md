# Yelp Camp 🏕️ (v4)

## Contents 🌈
- [Yelp Camp 🏕️ (v4)](#yelp-camp-️-v4)
  - [Contents 🌈](#contents-)
  - [1. Features and Functionality ✨](#1-features-and-functionality-)
    - [Update Log](#update-log)
      - [1.1 Updates](#11-updates)
      - [1.2 Updates](#12-updates)
      - [1.3 Updates](#13-updates)
      - [1.4 Updates](#14-updates)
      - [1.5 Updates](#15-updates)
  - [2. Technologies 🛠️](#2-technologies-️)
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

## 2. Technologies 🛠️
- Frontend: HTML/CSS, JS, EJS
- Backend: JS, Node
- Database: MongoDB
- Framework/Model: DOM, Express, Mongoose
- Platform: Git

## 3. Setup Instructions ⚙️
1. Clone the repo:
`
git clone https://github.com/Natalie-2004/yelp-camp.git
`
`
cd yelp-camp
`

2. Install dependencies:
`
npm install
`

3. Start the MongoDB server: (Ensure MongoDB is running on your machine)

    `
    mongosh mongodb://localhost:27017/yelp-camp
    `

4. Open another terminal and run the line:
`
node app.js
`

5. View the live server on any browser:
`
http://localhost:3000
`

## 4. Seeding the Database 🌱  
To seed the database with random campgrounds:
`node /seeds/index.js`

## 5. Usage 🚀
- Navigate to `/campgrounds` to view all campgrounds seeded.
- Use the "New Campground" button to create customise Campground.
- Click on a campground to view details, edit, or delete it.



