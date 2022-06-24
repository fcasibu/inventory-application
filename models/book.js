const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
    minLength: [3, 'A title must have a mininum length of 3 characters'],
    maxLength: [20, 'A title must not exceed 20 characters']
  },
  summary: {
    type: String,
    required: [true, 'A summary is required'],
    minLength: [3, 'A summary must have a minimum length of 3 characters'],
    maxLengtH: [200, 'A summary must not exceed 200 characters']
  },
  photoURL: {
    type: String,
    default: ''
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'A book must have an author'],
    ref: 'Author'
  },
  price: {
    type: Number,
    required: [true, 'A book must have a price'],
    min: 1,
    max: 99
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  genre: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre'
    }
  ],
  tag: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ]
});

BookSchema.virtual('url').get(function () {
  return `/books/${this._id}`;
});

BookSchema.virtual('comment_count', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'book',
  count: true
});

BookSchema.virtual('chapter_count', {
  ref: 'Chapter',
  localField: '_id',
  foreignField: 'book',
  count: true
});

module.exports = mongoose.model('Book', BookSchema);
