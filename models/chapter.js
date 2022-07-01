const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  text: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 6000
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ChapterSchema.virtual('url').get(function () {
  return `/books/${this.book._id}/chapters/${this._id}`;
});

ChapterSchema.virtual('createdAt_formatted').get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Chapter', ChapterSchema);
