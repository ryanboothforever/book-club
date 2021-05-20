const Comment = require("../models/Comment");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const comments = await Comment.find({ user: req.user.id });
      res.render("profile.ejs", { comments: comments, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const comments = await Comment.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  getComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      res.render("comment.ejs", { comment: comment, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      await Comment.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/comment/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete comment from db
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
