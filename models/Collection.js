const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    require: true,
  },
  clubMembers: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
