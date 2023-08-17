const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const isValidobjectId = require("../middlewares/isValidobjectId.js");
const isAuth = require("../middlewares/isAuth.js");
const { isAuthorReview } = require("../middlewares/isAuthor.js");
const ReviewsControllers = require("../controllers/review.controller.js");
const { validateReview } = require("../middlewares/validator.js");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  isAuth,
  isValidobjectId("places"),
  validateReview,
  wrapAsync(ReviewsControllers.store)
);

router.delete(
  "/:review_id",
  isAuth,
  isAuthorReview,
  wrapAsync(ReviewsControllers.destroy)
);

module.exports = router;
