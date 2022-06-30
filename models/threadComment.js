const mongoose = require('mongoose');

const ThreadCommentSchema = new mongoose.Schema({
  text: {
    type: String,
    minLength: 3,
    maxLength: 500
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ThreadComment', ThreadCommentSchema);
