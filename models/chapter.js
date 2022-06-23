const mongoose = require('mongoose');

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
    minLength: [3, 'A title must have a mininum length of 3 characters'],
    maxLength: [50, 'A title must not exceed 50 characters']
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }
});

ChapterSchema.virtual('url').get(() => `/books/${this.book._id}/chapters/${this._id}`);

module.exports = mongoose.model('Chapter', ChapterSchema);
