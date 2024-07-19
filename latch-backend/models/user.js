const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['graduate', 'mentor'], required: true },
  skills: [String],
  experience: String,
  goals: String,
  profilePicture: String, // URL to profile picture
  coverPhoto: String, // URL to cover photo
});

const User = mongoose.model('User', userSchema);
module.exports = User;
