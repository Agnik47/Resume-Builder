const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Reference to resumes
  resumes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
    },
  ],
});

// A pre-save hook to hash the password before saving a new user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Corrected typo: generateJwtToken
userSchema.methods.generateJwtToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
  return token;
};

// Corrected typo: hashPassword. This is now redundant with the pre-save hook, but kept for reference.
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Method to compare the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;