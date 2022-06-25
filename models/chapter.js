const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
    minLength: [3, 'A title must have a mininum length of 3 characters'],
    maxLength: [50, 'A title must not exceed 50 characters']
  },
  text: {
    type: String,
    required: [true, 'A text is reuired'],
    minLength: [10, 'A text must have a minimum length of 10 characters'],
    maxLength: [6000, 'A text must not exceed 6000 characters']
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
