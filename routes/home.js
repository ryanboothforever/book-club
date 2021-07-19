const express = require("express");
// Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
const router = express.Router();
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const entriesController = require("../controllers/posts");
// brings in Clubs schema from model
const clubsController = require("../controllers/clubs");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", homeController.getIndex);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/profile", ensureAuth, clubsController.getClub);
router.get("/createclubform", ensureAuth, clubsController.createClubForm);

router.get("/feed", ensureAuth, entriesController.getFeed);
router.get("/entry", entriesController.getEntry);

module.exports = router;
