const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
    minLength: [3, 'A title must have a mininum length of 3 characters'],
    maxLength: [20, 'A title must not exceed 20 characters']
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
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  chapter: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chapter'
    }
  ],
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

BookSchema.virtual('url').get(() => `/books/${this._id}`);

module.exports = mongoose.model('Book', BookSchema);
