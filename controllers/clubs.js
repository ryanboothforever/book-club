const { ObjectId } = require('bson');
const cloudinary = require('../middleware/cloudinary');
const Club = require('../models/Clubs');

module.exports = {
  getClub: async (req, res) => {
    try {
      const club = await Club.findById(req.params.id);
      res.render('profile.ejs', { clubs: club, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
};
