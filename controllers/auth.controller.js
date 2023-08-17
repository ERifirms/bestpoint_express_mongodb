const User = require("../models/user.js");

module.exports.registerForm = (req, res) => {
  res.render("auth/register");
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerUser = await User.register(user, password);
    req.login(registerUser, (err) => {
      if (err) return next(err);
      req.flash("seccess_msg", "You are registerd and can logged in");
      res.redirect("/places");
    });
  } catch (error) {
    req.flash("error_msg", error.message);
    res.redirect("/register");
  }
};

module.exports.loginForm = (req, res) => {
  res.render("auth/login");
};

module.exports.login = (req, res) => {
  req.flash("seccess_msg", "you are logged in");
  res.redirect("/places");
};

module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("seccess_msg", "You are logged out");
    res.redirect("/login");
  });
};
