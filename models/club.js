const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    minLength: [3, 'A name must have a mininum length of 3 characters'],
    maxLength: [30, 'A name must not exceed 30 characters']
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  }
});

ClubSchema.virtual('url').get(function () {
  return `/clubs/${this._id}`;
});

module.exports = mongoose.model('Club', ClubSchema);
