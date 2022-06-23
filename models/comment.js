const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    minLength: [3, 'A name must have a mininum length of 3 characters'],
    maxLength: [30, 'A name must not exceed 30 characters']
  },
  comment: {
    type: String,
    minLength: [3, 'A comment must have a minimum length of 3 characters'],
    maxLength: [1000, 'A comment must not exceed 1000 characters']
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }
});

CommentSchema.virtual('url').get(() => `/books/${this.book._id}/comment/${this._id}`);

module.exports = mongoose.model('Comment', CommentSchema);
