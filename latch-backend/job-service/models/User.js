const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['graduate', 'mentor', 'admin'], required: true },
  skills: [String],
  experience: String,
  goals: String,
  profilePicture: String,
  coverPhoto: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;