const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
  comment: {
    type: String,
    minLength: [3, 'A comment must have a minimum length of 3 characters'],
    maxLength: [500, 'A comment must not exceed 1000 characters']
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  }
});

module.exports = mongoose.model('Discussion', DiscussionSchema);
