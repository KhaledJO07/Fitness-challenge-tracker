const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Optional but useful fields:
  name: { type: String, default: 'Anonymous' },

  // List of other users (for social/friend system)
  //friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  // Challenges this user has joined
  //joinedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],

  // Logs of progress
  //progress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Progress' }],
});

module.exports = mongoose.model('User', userSchema);
