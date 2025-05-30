# 🏕️ YelpCamp v8

An end-to-end **full-stack web application** for sharing and reviewing campgrounds — inspired by Colt Steele. Users can create accounts, post campgrounds, write reviews, upload images, and explore locations on an interactive map.

🔗 [Live Website](https://yelpcamp-k2tw.onrender.com/) • 📦 [GitHub Repo](https://github.com/Natalie-2004/YelpCamp/tree/main) • 📝 [API Doc](https://natalie-2004.github.io/swagger-docs/)

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🚀 Usage](#-usage)
- [⚙️ Deployment](#-deployment)
- [📄 Setup Instructions](#-setup-instructions)
- [🧪 Future Improvements](#-future-improvements)

---

## ✨ Features

### 🔧 Core Functionality
- Full CRUD operations on campgrounds and reviews
- User registration, login, and logout
- **Role-based access control** — only authors can edit/delete their posts and reviews
- Server-side and client-side data validation
- Flash messages responding to users' interaction with the app
- Responsive web design

### 🌐 Mapping & Search
- Geocoding with **Mapbox** and **GeoJSON** integration
- Interactive cluster maps for campground locations
- Live search with **dynamic filtering**

### 📷 Image Uploads
- Image uploads and deletions using **Multer** and **Cloudinary**
- Carousel display for multiple images per campground

### 🛡️ Security
- Protection against **NoSQL injection**, **XSS**, and other vulnerabilities
- Secure session storage with **MongoDB**
- Sanitization with **helmet**, `express-mongo-sanitize`, and `mongo-sanitize`

---

## 🛠️ Tech Stack

| Layer        | Technology |
|--------------|------------|
| **Frontend** | HTML, CSS, JavaScript, EJS, Bootstrap 5 |
| **Backend**  | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose), MongoDB Atlas |
| **Auth & Forms** | Passport.js, Joi |
| **Uploads**  | Multer, Cloudinary |
| **Mapping**  | Mapbox, GeoJSON |
| **Security** | Helmet, Mongo Sanitize, Express Mongo Sanitize |

---

## 🚀 Usage

### 🧭 Explore Features
- View campgrounds and reviews without login
- Explore interactive maps of campground locations

### 📝 Account Management
- Register a new user account
- Login/Logout to access full features

### 🏕️ Campground Listings
- Add, edit, and delete your own campgrounds
- Upload multiple images per campground
- See your campground on the map

### 💬 Reviews and Ratings
- Post and delete reviews for any campground
- Only review authors or campground creators can delete

---

## ⚙️ Deployment

- **Live Demo**: [yelpcamp-k2tw.onrender.com](https://yelpcamp-k2tw.onrender.com/)
> ⚠️ Initial load might take a few seconds on Render free tier.
> ⚠️ Do not disclose real password through registration even though password is automatically hashing

---

## 📄 Setup Instructions

> Run the following steps to get this project running locally:

```bash
# 1. Clone the repo
git clone https://github.com/Natalie-2004/YelpCamp.git

# 2. Navigate to the project directory
cd YelpCamp

# 3. Install dependencies
npm install

# 4. Create a `.env` file and add the following:
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_KEY=
# CLOUDINARY_SECRET=
# MAPBOX_TOKEN=
# DB_URL=your_mongodb_atlas_url || default_mongodb_url
# SECRET=your_cookie_secret

# 5. Start the server
node app.js
