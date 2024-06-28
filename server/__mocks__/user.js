const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  liked: [String]
});

const User = jest.fn(() => ({
  _id: new mongoose.Types.ObjectId(),
  liked: [],
  save: jest.fn().mockResolvedValue(this)
}));

User.findById = jest.fn();

module.exports = User;
