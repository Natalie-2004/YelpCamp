const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoding = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    // pass campgrounds to views/campgrounds/index.ejs
    res.render('campgrounds/index', { campgrounds });
}

module.exports.new = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.create = async (req, res) => {
    const geoData = await geocoding.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();
    // by default .body is empty
    // .Campground since it's grouped at ejs
    const campgroundNew = new Campground(req.body.campground);
    // the coordinates are in the format of [longitude, latitude]
    campgroundNew.geometry = {
        type: 'Point',
        coordinates: geoData.body.features[0].geometry.coordinates
    }
    campgroundNew.images = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }));
    campgroundNew.author = req.user._id;
    await campgroundNew.save();
    req.flash('success', 'Successfully post a new campground!');
    res.redirect(`/campgrounds/${campgroundNew._id}`);
}

module.exports.show = async (req, res) => {
    // const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    const campground = await Campground.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author');
    // console.log(campground);
    if (!campground) {
        req.flash('error', 'Cannot found such campground!');
        return res.redirect('/campgrounds');
    } else res.render('campgrounds/show', { campground });
}

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot found such campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.update = async (req, res) => {
    const { id } = req.params;
    // check if currUser is the author of the campground
    const camp = await Campground.findByIdAndUpdate(id, {
        ...req.body.campground,
    }, {
        new: true
    })
    // turn into array
    const imgs = req.files.map(f => ({
        url: f.path,
        filename: f.filename
    }));
    camp.images.push(...imgs);
    const title = camp.title;

    await camp.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        // pull from the images array, all images where the filename of that image is in the deleteImages array
        await camp.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}});
    }
    req.flash('success', `Successfully update the ${title}!`);
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    for(let img of campground.images) {
        await cloudinary.uploader.destroy(img.filename);
        // console.log("Delete images: " + img);
    }
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the campground!');
    res.redirect('/campgrounds');
}