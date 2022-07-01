const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  }
});

GenreSchema.virtual('url').get(function () {
  return `/genres/${this._id}`;
});

module.exports = mongoose.model('Genre', GenreSchema);
