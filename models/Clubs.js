const mongoose = require('mongoose');

// template for user's clubs
const ClubSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true, trim: true },
  bookAuthor: { type: String, required: true, trim: true },
  founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  synopsis: { type: String },
  status: { type: String, default: 'public', enum: ['public', 'private'] },
  createdAt: { type: Date, default: Date.now },
  members: { type: Array },
});

module.exports = mongoose.model('Club', ClubSchema);
