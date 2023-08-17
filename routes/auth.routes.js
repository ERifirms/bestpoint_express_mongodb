const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router
  .route("/register")
  .get(AuthController.registerForm)
  .post(wrapAsync(AuthController.register));

router
  .route("/login")
  .get(AuthController.loginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: {
        type: "error_msg",
        msg: "invalid username or password",
      },
    }),
    AuthController.login
  );

router.post("/logout", AuthController.logout);

module.exports = router;
