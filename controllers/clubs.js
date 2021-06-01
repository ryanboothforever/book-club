const { ObjectId } = require("bson");
const cloudinary = require("../middleware/cloudinary");
const Clubs = require("../models/Clubs");

module.exports = {
  getClub: async (req, res) => {
    try {
      const clubs = await Clubs.find().sort({ createdAt: "desc" }).lean();
      console.log("testing");
      res.render("profile.ejs", { clubs: clubs, user: req.user });
    } catch (err) {
      console.log("testing 2");
      console.log(err);
    }
  },
  createClub: async (req, res) => {
    try {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      await Club.create({
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        synopsis: req.body.synopsis,
        founder: req.user.id,
        memebers: [],
      });
      console.log("Entry has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
};
