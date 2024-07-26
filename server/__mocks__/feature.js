const mongoose = require('mongoose');
const { Schema } = mongoose;

const featureSchema = new Schema({
  title: String,
  type: String,
  liked: [String]
});

const Feature = jest.fn(() => ({
  _id: new mongoose.Types.ObjectId(),
  title: '',
  type: '',
  liked: [],
  save: jest.fn().mockResolvedValue(this)
}));

Feature.findById = jest.fn();
Feature.findByIdAndUpdate = jest.fn();

module.exports = Feature;