const Club = require('../models/club');
const Thread = require('../models/thread');
const Member = require('../models/member');

exports.club_list_get = async (req, res, next) => {
  res.send('Not yet implemented');
};

exports.club_detail_get = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.clubId)
      .populate('book', 'title')
      .populate('thread_list')
      .populate('thread_count')
      .populate('member_count')
      .exec();

    res.render('club_detail', { club });
  } catch (err) {
    next(err);
  }
};

exports.club_create_get = async (req, res, next) => {
  res.send('Not yet implemented');
};

exports.club_create_post = [
  async (req, res, next) => {
    res.send('Not yet implemented');
  }
];
