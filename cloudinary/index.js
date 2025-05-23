const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { urlencoded } = require('express');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// pass into cloudinary object to create a new instance
// it has crentials for particular cloudinary account
// so that we can upload files with particular format
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
})

// cloudinary image for seedings
const cloudinaryImages = [
    {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716666/camp1_rhdiou.jpg`,
        filename: `YelpCamp/camp1_rhdiou`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716673/camp2_th7hcd.jpg`,
        filename: `YelpCamp/camp2_th7hcd`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716661/camp3_tnreit.jpg`,
        filename: `YelpCamp/camp3_tnreit`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716667/camp4_hfmaff.jpg`,
        filename: `YelpCamp/camp4_hfmaff`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716664/camp5_qqigtt.jpg`,
        filename: `YelpCamp/camp5_qqigtt`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716658/camp6_qmb2vi.jpg`,
        filename: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716658/camp6_qmb2vi.jpg`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716665/camp7_y0fs9f.jpg`,
        filename: `YelpCamp/camp7_y0fs9f`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716673/camp8_n1z5nc.jpg`,
        filename: `YelpCamp/camp8_n1z5nc`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716655/camp9_r7yrqy.jpg`,
        filename: `YelpCamp/camp9_r7yrqy`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744716657/camp10_bd8smf.jpg`,
        filename: `YelpCamp/camp10_bd8smf`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744718184/camp11_tph3x4.jpg`,
        filename: `YelpCamp/camp11_tph3x4`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744718256/camp12_r2z6m7.jpg`,
        filename: `YelpCamp/camp12_r2z6m7`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744718252/camp13_mgi2sc.jpg`,
        filename: `YelpCamp/camp13_uxxj2y`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744718252/camp14_ump3il.jpg`,
        filename: `YelpCamp/camp14_ump3il`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1746963093/YelpCamp/tdrxnsqdcwuqxfhndhv4.jpg`,
        filename: `YelpCamp/camp15`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744718253/camp16_ccbjst.jpg`,
        filename: `YelpCamp/camp16_uxxj2y`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744718233/camp17_ievnym.jpg`,
        filename: `YelpCamp/camp17_uxxj2y`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744718216/camp18_ebv2bl.jpg`,
        filename: `YelpCamp/camp18_uxxj2y`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744718203/camp19_w68g7i.jpg`,
        filename: `YelpCamp/camp19_uxxj2y`
    }, {
        url: `https://res.cloudinary.com/dduweiukj/image/upload/v1744718195/camp20_xaszcz.jpg`,
        filename: `YelpCamp/camp20_uxxj2y`
    }
]

module.exports = {
    cloudinary,
    storage, 
    cloudinaryImages
}