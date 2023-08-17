const Place = require("../models/place.js");
const Review = require("../models/review.js");

module.exports.isAuthorPlace = async (req, res, next) => {
  const { id } = req.params;
  let place = await Place.findById(id);

  if (!place.author.equals(req.user._id)) {
    req.flash("error_msg", "Not authorize");
    return res.redirect("/places");
  }
  next();
};

module.exports.isAuthorReview = async (req, res, next) => {
  const { place_id, review_id } = req.params;
  let place = await Review.findById(review_id);

  if (!place.author.equals(req.user._id)) {
    req.flash("error_msg", "Not authorize");
    return res.redirect(`/places/${place_id}`);
  }
  next();
};
