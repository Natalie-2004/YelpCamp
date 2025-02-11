# Yelp Camp 🏕️ (v1)

## Contents 🌈
- [1. Features ✨](#1-Features-) 
- [2. Technologies 🛠️](#2-technologies-️)
- [3. Setup Instructions ⚙️](#3-setup-instructions-️)
- [4. Seeding the Database 🌱](#4-seeding-the-database-)
- [5. Usage 🚀](#5-usage-)

## 1. Features ✨
- Create new campgrounds with a title and location.
- View a list of all campgrounds.
- Edit existing campgrounds.
- Delete campgrounds.

## 2. Technologies 🛠️
- Node.js and Express for the server.
- MongoDB and Mongoose for the database.
- EJS for templating.
- Method-Override for handling PUT and DELETE requests.

## 3. Setup Instructions ⚙️
1. Clone the repo:
`
git clone https://github.com/Natalie-2004/yelp-camp.git
cd yelp-camp
`

2. Install dependencies:
`
npm install
`

3. Start the MongoDB server: (Ensure MongoDB is running on your machine.)
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
To seed the database with random campgrounds
`node /seeds/index.js`

## 5. Usage 🚀
- Navigate to `/campgrounds` to view all campgrounds.
- Use the "New Campground" button to add a new listing.
- Click on a campground to view details, edit, or delete it.


