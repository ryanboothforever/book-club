const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likeCount: {
    type: Number,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: String,
      postedBy: mongoose.Schema.Types.ObjectId,
      // save the user who posted this comment(NOTE: this ref throws an error)
      //ref: "User",
    },
  ],
  commentCount: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Entry', EntrySchema);
