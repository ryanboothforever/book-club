const mongoose = require("mongoose");

// template for user's clubs
const ClubSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true, trim: true },
  bookAuthor: { type: String, required: true, trim: true },
  founderID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  founderName: { type: String, required: true },
  synopsis: { type: String },
  status: { type: String, default: "public", enum: ["public", "private"] },
  createdAt: { type: Date, default: Date.now },
  members: { type: Array },
});

module.exports = mongoose.model("Clubs", ClubSchema);
