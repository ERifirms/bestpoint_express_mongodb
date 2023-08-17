const Place = require("../models/place");
const fs = require("fs");
const ExpressError = require("../utils/ErrorHandler.js");

module.exports.index = async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
};

module.exports.create = (req, res) => {
  res.render("places/create");
};

module.exports.store = async (req, res, next) => {
  const images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));

  const newPlace = new Place(req.body.place);
  newPlace.author = req.user._id;
  newPlace.images = images;

  await newPlace.save();
  req.flash("seccess_msg", "Place added successfully");
  res.redirect("/places");
};

module.exports.show = async (req, res) => {
  const place = await Place.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("places/show", { place });
};

module.exports.edit = async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.render("places/edit", { place });
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findByIdAndUpdate(id, { ...req.body.place });

  if (req.files && req.files.length > 0) {
    place.images.forEach((image) => {
      fs.unlink(image.url, (err) => new ExpressError(err));
    });

    const images = req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }));
    place.images = images;
    await place.save();
  }

  req.flash("seccess_msg", "Place Updated successfully");
  res.redirect(`/places/${id}`);
};

module.exports.destroy = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);

  if (place.images.length > 0) {
    place.images.forEach((image) => {
      fs.unlink(image.url, (err) => new ExpressError(err));
    });
  }
  await place.deleteOne();

  req.flash("seccess_msg", "Place deleted successfully");
  res.redirect("/places");
};
