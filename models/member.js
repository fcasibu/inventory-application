const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 25
  },
  photoURL: {
    type: String
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  }
});

MemberSchema.virtual('url').get(function () {
  return `/clubs/${this.club._id}/members/${this._id}`;
});

module.exports = mongoose.model('Member', MemberSchema);
