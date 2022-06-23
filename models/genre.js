const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    minLength: [3, 'A name must have a mininum length of 3 characters'],
    maxLength: [10, 'A name must not exceed 10 characters']
  }
});

GenreSchema.virtual('url').get(function () {
  return `/genres/${this._id}`;
});

module.exports = mongoose.model('Genre', GenreSchema);
