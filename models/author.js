const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    minLength: [3, 'A name must have a mininum length of 3 characters'],
    maxLength: [20, 'A name must not exceed 20 characters']
  },
  photoURL: {
    type: String,
    default: ''
  }
});

AuthorSchema.virtual('url').get(function () {
  return `/authors/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
