const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    minLength: [3, 'A name must have a mininum length of 3 characters'],
    maxLength: [25, 'A name must not exceed 25 characters']
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  }
});

MemberSchema.virtual('url').get(() => `/clubs/${this.club._id}/members/${this._id}`);

module.exports = mongoose.model('Member', MemberSchema);
