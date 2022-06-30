const mongoose = require('mongoose');
const Chapter = require('./chapter');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 70
  },
  summary: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 1000
  },
  photoURL: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Author'
  },
  price: {
    type: Number,
    default: 10,
    min: 1,
    max: 30
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

BookSchema.virtual('genre_list').get(function () {
  return this.genre
    .reduce((acc, curr) => {
      acc += `${curr.name}, `;
      return acc;
    }, '')
    .slice(0, -2);
});

BookSchema.virtual('tag_list').get(function () {
  return this.tag
    .reduce((acc, curr) => {
      acc += `${curr.name}, `;
      return acc;
    }, '')
    .slice(0, -2);
});

BookSchema.virtual('comment_list', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'book'
});

BookSchema.virtual('chapter_list', {
  ref: 'Chapter',
  localField: '_id',
  foreignField: 'book'
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

// pre middleware for deleting all the chapters when a book is deleted
BookSchema.pre('findOneAndDelete', async function (next) {
  try {
    await Chapter.deleteMany({ book: this.getQuery()._id });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Book', BookSchema);
