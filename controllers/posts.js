const { ObjectId } = require('bson');
const cloudinary = require('../middleware/cloudinary');
const Entry = require('../models/Entry');
const { post, entry } = require('../routes/home');

module.exports = {
  getProfile: async (req, res) => {
    try {
      // find user by it's id and put it inside a variable
      const entries = await Entry.find({ user: req.user.id });
      // render ejs using user's id from the request and export variable for use in ejs
      res.render('profile.ejs', { entries: entries, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getFeed: async (req, res) => {
    try {
      const entries = await Entry.find().sort({ createdAt: 'desc' }).lean();
      res.render('feed.ejs', { entries: entries, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getEntry: async (req, res) => {
    try {
      const entry = await Entry.findById(req.params.id);
      res.render('entry.ejs', { entry: entry, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createEntry: async (req, res) => {
    try {
      // upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      console.log(result);
      await Entry.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likeCount: 0,
        likes: [],
        user: req.user.id,
        author: req.user.userName,
        // initialize comment count at 0, empty array of comments
        commentCount: 0,
        comments: [],
      });
      console.log('Entry has been added!');
      res.redirect('/profile');
    } catch (err) {
      console.log(err);
    }
  },
  // this would move to likes.js controller
  likeEntry: async (req, res) => {
    try {
      await Entry.findOneAndUpdate(
        { _id: req.params.id, likes: { $ne: ObjectId(req.user.id) } },
        {
          $inc: { likeCount: 1 },
          $push: { likes: ObjectId(req.user.id) },
        },
        console.log('Liked the entry!'),
        res.redirect(`/entries/${req.params.id}`)
      );
    } catch (err) {
      console.log(err);
    }
  },
  unlikeEntry: async (req, res) => {
    try {
      await Entry.findOneAndUpdate(
        { _id: req.params.id, likes: ObjectId(req.user.id) },
        {
          $inc: { likeCount: -1 },
          $pull: { likes: ObjectId(req.user.id) },
        },
        console.log('unLiked the entry!'),
        res.redirect(`/entries/${req.params.id}`)
      );
    } catch (err) {
      console.log(err);
    }
  },
  deleteEntry: async (req, res) => {
    try {
      // Find post by id
      let entry = await Entry.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(entry.cloudinaryId);

      await Entry.remove({ _id: req.params.id });
      console.log('Deleted Entry');
      res.redirect('/profile');
    } catch (err) {
      res.redirect('/profile');
    }
  },
  // add a comment to an existing entry and using (consuming) the agreed upon Entry model
  createEntryComment: async (req, res) => {
    try {
      await Entry.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { commentCount: 1 },
          $push: { comments: req.body.comment },
        },
        console.log('comment has been added'),
        res.redirect(`/entries/${req.params.id}`)
      );
    } catch (err) {
      console.log(err);
      //res.redirect("feed.ejs", { entries: entries });
    }
  },
};
