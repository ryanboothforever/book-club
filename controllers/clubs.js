const { ObjectId } = require("bson");
const cloudinary = require("../middleware/cloudinary");
const Clubs = require("../models/Clubs");
const Users = require("../models/User");
const Books = (module.exports = {
  getClub: async (req, res) => {
    try {
      const clubs = await Clubs.find().sort({ createdAt: "desc" }).lean();
      res.render("profile.ejs", { clubs: clubs, user: req.user });
    } catch (err) {
      console.log(err);
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
    let members;
    if (members === undefined) {
      members = [req.user.id];
      console.log(`${members}: first if`);
    } else if (typeof req.body.members === "string") {
      members = [req.user.id, req.body.members];
      console.log(`${members}: 2nd if`);
    } else if (Array.isArray(req.body.members)) {
      members = req.body.members;
      members.unshift(req.user.id);
      console.log(`${members}: 3rd if`);
    } else {
      res.status(400).send("Invalid value for members field.");
      console.log(`${members}: else`);
    }
    try {
      console.log(req.body.members);
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
      console.log(`Members: ${members}`);
      console.log("Club has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
});
