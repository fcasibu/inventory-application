const Club = require('../models/club');
const Thread = require('../models/thread');
const ThreadComment = require('../models/threadComment');
const Member = require('../models/member');

exports.club_list_get = async (req, res, next) => {
  res.render('club_list');
};

exports.club_detail_get = async (req, res, next) => {
  try {
    const club = Club.findById(req.params.clubId)
      .populate('book', 'title')
      .populate('thread_count')
      .populate('member_count')
      .exec();

    // I can also just populate thread above
    const thread = Thread.find({ club: req.params.clubId })
      .populate('comment_count')
      .exec();

    const [targetClub, threads] = await Promise.all([club, thread]);

    res.render('club_detail', { club: targetClub, threads });
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
