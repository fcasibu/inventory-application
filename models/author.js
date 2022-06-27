const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    minLength: [3, 'A name must have a mininum length of 3 characters'],
    maxLength: [20, 'A name must not exceed 20 characters']
  },
  photoURL: {
    type: String
  }
});

AuthorSchema.virtual('url').get(function () {
  return `/authors/${this._id}`;
});

AuthorSchema.virtual('book_list', {
  ref: 'book',
  localField: '_id',
  foreignField: 'author'
});

AuthorSchema.virtual('book_list_count', {
  ref: 'book',
  localField: '_id',
  foreignField: 'author',
  count: true
});

module.exports = mongoose.model('Author', AuthorSchema);
