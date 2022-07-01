const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  },
  photoURL: {
    type: String
  }
});

AuthorSchema.virtual('url').get(function () {
  return `/authors/${this._id}`;
});

AuthorSchema.virtual('book_list', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author'
});

AuthorSchema.virtual('book_count', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'author',
  count: true
});

module.exports = mongoose.model('Author', AuthorSchema);
