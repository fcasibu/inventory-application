const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Thread = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  description: {
    type: String,
    minLength: 3,
    maxLength: 500
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  },
  comments: [{ type: String, minLength: 3, maxLength: 500 }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

Thread.virtual('url').get(function () {
  return `/clubs/${this.club._id}/threads/${this._id}`;
});

Thread.virtual('createdAt_formatted').get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Thread', Thread);
