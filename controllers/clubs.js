const { ObjectId } = require("mongodb");
const cloudinary = require("../middleware/cloudinary");
const Clubs = require("../models/Clubs");
const Users = require("../models/User");
const Books = (module.exports = {
  getClub: async (req, res) => {
    try {
      const clubs = await Clubs.find().populate("members", "userName");
      console.log(JSON.stringify(clubs, null, 4));
      res.render("profile.ejs", {
        clubs: clubs,
        user: req.user,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getSeeClub: async (req, res) => {
    const id = new ObjectId(req.params.id);
    try {
      const club = await Clubs.findById({ _id: id });
      console.log(req.params.id);
      res.render("club.ejs", {
        club: club,
      });
    } catch (err) {
      console.error(`Club not found: ${err}`);
    }
  },
  createClubForm: async (req, res) => {
    try {
      const users = await Users.find().sort({ createdAt: "desc" }).lean();
      res.render("createclubform.ejs", { users });
    } catch (err) {
      console.log(err);
    }
  },
  createClub: async (req, res) => {
    if (req.body.members === undefined) {
      req.body.members = [req.user.id];
    } else if (typeof req.body.members === "string") {
      req.body.members = [req.user.id, req.body.members];
    } else if (Array.isArray(req.body.members)) {
      req.body.members = req.body.members;
      req.body.members.unshift(req.user.id);
    } else {
      res.status(400).send("Invalid value for members field.");
    }

    try {
      await Clubs.create({
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        //image: result.secure_url,
        //cloudinaryId: result.public_id,
        synopsis: req.body.synopsis,
        founderID: req.user.id,
        founderName: req.user.userName,
        members: req.body.members,
      });
      console.log("Club has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
});
