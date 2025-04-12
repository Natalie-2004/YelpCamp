const Campground = require('../models/campground');

module.exports.index = async (req, res, next) => {
    const campgrounds = await Campground.find({});
    // pass campgrounds to views/campgrounds/index.ejs
    res.render('campgrounds/index', { campgrounds });
}

module.exports.new = (req, res) => {
    res.render('campgrounds/new');
}

module.exports.create = async (req, res) => {
    // by default .body is empty
    // .Campground since it's grouped at ejs
    const campgroundNew = new Campground(req.body.campground);
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
    const title = camp.title;
    req.flash('success', `Successfully update the ${title}!`);
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.delete = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the campground!');
    res.redirect('/campgrounds');
}