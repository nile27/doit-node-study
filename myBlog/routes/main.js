const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";

router.get(["/", "/home"], (req, res) => {
  const locals = {
    title: "HOME",
  };

  res.render("index", { locals, layout: mainLayout });
});

router.get("/about", (req, res) => {
  const locals = {
    title: "ABOUT",
  };

  res.render("about", { locals, layout: mainLayout });
});

module.exports = router;
