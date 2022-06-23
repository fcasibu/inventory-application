const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    minLength: [3, 'A name must have a mininum length of 3 characters'],
    maxLength: [30, 'A name must not exceed 30 characters']
  }
});

TagSchema.virtual('url').get(() => `/tags/${this._id}`);

module.exports = mongoose.model('Tag', TagSchema);
