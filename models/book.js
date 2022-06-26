const mongoose = require('mongoose');
const Chapter = require('./chapter');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
    minLength: [3, 'A title must have a mininum length of 3 characters'],
    maxLength: [70, 'A title must not exceed 70 characters'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'A summary is required'],
    minLength: [10, 'A summary must have a minimum length of 3 characters'],
    maxLength: [1000, 'A summary must not exceed 1000 characters'],
    trim: true,
    escape: true
  },
  photoURL: {
    type: String,
    default: 'https://fivebooks.com/app/uploads/2010/09/no_book_cover.jpg',
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'A book must have an author'],
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
  return this.genre.reduce((acc, curr) => (acc += `${curr.name}, `), '');
});

BookSchema.virtual('tag_list').get(function () {
  return this.tag.reduce((acc, curr) => (acc += `${curr.name}, `), '');
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
// BookSchema.pre('findOneAndDelete', async function (next) {
//   try {
//     await Chapter.deleteMany({ book: this.getQuery()._id})
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = mongoose.model('Book', BookSchema);
