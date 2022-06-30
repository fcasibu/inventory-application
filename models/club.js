const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Thread = require('./thread');

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ClubSchema.virtual('url').get(function () {
  return `/clubs/${this._id}`;
});

ClubSchema.virtual('member_count', {
  ref: 'Member',
  localField: '_id',
  foreignField: 'club',
  count: true
});

ClubSchema.virtual('member_list', {
  ref: 'Member',
  localField: '_id',
  foreignField: 'club'
});

ClubSchema.virtual('thread_list', {
  ref: 'Thread',
  localField: '_id',
  foreignField: 'club'
});

ClubSchema.virtual('thread_count', {
  ref: 'Thread',
  localField: '_id',
  foreignField: 'club',
  count: true
});

ClubSchema.virtual('createdAt_formatted').get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Club', ClubSchema);
