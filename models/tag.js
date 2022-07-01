const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30
  }
});

TagSchema.virtual('url').get(function () {
  return `/tags/${this._id}`;
});

module.exports = mongoose.model('Tag', TagSchema);
