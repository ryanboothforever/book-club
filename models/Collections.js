const mongoose = require('mongoose');

// template for storing user's collections
const CollectionsSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true, trim: true },
  bookAuthor: { type: String, required: true, trim: true },
  founder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  synopsis: { type: String },
  status: { type: String, default: 'public', enum: ['public', 'private'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Story', StorySchema);
