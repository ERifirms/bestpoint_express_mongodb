const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const isValidobjectId = require("../middlewares/isValidobjectId.js");
const isAuth = require("../middlewares/isAuth.js");
const { isAuthorPlace } = require("../middlewares/isAuthor.js");
const PlaceControllers = require("../controllers/places.controller");
const { validatePlace } = require("../middlewares/validator.js");
const upload = require("../config/multer.js");

const router = express.Router();

router
  .route("/")
  .get(wrapAsync(PlaceControllers.index))
  .post(
    isAuth,
    upload.array("image", 5),
    validatePlace,
    wrapAsync(PlaceControllers.store)
  );

router.get("/create", isAuth, PlaceControllers.create);

router
  .route("/:id")
  .get(isValidobjectId("/places"), wrapAsync(PlaceControllers.show))
  .put(
    isAuth,
    upload.array("image", 5),
    isAuthorPlace,
    isValidobjectId("/places"),
    validatePlace,
    wrapAsync(PlaceControllers.update)
  )
  .delete(
    isAuth,
    isAuthorPlace,
    isValidobjectId("/places"),
    wrapAsync(PlaceControllers.destroy)
  );

router.get(
  "/:id/edit",
  isAuth,
  isAuthorPlace,
  isValidobjectId("/places"),
  wrapAsync(PlaceControllers.edit)
);

module.exports = router;
