const Place = require("../models/place");

module.exports.index = async (req, res) => {
  const places = await Place.find();
  res.render("places/index", { places });
};

module.exports.create = (req, res) => {
  res.render("places/create");
};

module.exports.store = async (req, res, next) => {
  const { title, image, description, price } = req.body.place;
  const author = req.user;
  const newPlace = new Place({
    title,
    image,
    description,
    price,
    author,
  });
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
  await Place.findByIdAndUpdate(id, { ...req.body.place });
  req.flash("seccess_msg", "Place Updated successfully");
  res.redirect(`/places/${id}`);
};

module.exports.destroy = async (req, res) => {
  await Place.findByIdAndDelete(req.params.id);
  req.flash("seccess_msg", "Place deleted successfully");
  res.redirect("/places");
};
