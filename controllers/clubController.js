const { body, validationResult } = require('express-validator');
const catchErr = require('../utils/catchErr');
const Club = require('../models/club');
const Member = require('../models/member');

exports.club_list_get = catchErr(async (req, res, next) => {
  const clubs = await Club.find()
    .populate('member_count')
    .populate('thread_count')
    .sort('member_count')
    .exec();

  res.render('club_list', { clubs });
});

exports.club_detail_get = catchErr(async (req, res, next) => {
  const club = await Club.findById(req.params.clubId)
    .populate('thread_count')
    .populate('member_count')
    .populate('thread_list')
    .exec();

  res.render('club_detail', { club });
});

exports.club_create_get = (req, res, next) => {
  res.render('club_form', { title: 'Create a Club' });
};

exports.club_create_post = [
  body('name', 'A club name must have a minimum length of 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  catchErr(async (req, res, next) => {
    const errors = validationResult(req);
    const club = new Club({
      name: req.body.name
    });

    if (!errors.isEmpty()) {
      return res.render('club_form', {
        title: 'Create a Club',
        club,
        errors: errors.array()
      });
    }

    await club.save();
    res.redirect(club.url);
  })
];

exports.club_delete_get = catchErr(async (req, res, next) => {
  const club = await Club.findById(req.params.clubId, 'name');
  res.render('club_delete', { club });
});

exports.club_delete_post = catchErr(async (req, res, next) => {
  if (req.body.password === process.env.PASSWORD) {
    await Club.findByIdAndDelete(req.params.clubId);
    res.redirect('/clubs');
  } else {
    const club = await Club.findById(req.params.clubId, 'name');
    res.render('club_delete', { club, error: { msg: 'Invalid Password' } });
  }
});

exports.club_update_get = catchErr(async (req, res, next) => {
  const club = await Club.findById(req.params.clubId);

  res.render('club_form', { club, isUpdate: true });
});

exports.club_update_post = [
  body('name', 'A club name must have a minimum length of 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('book', 'You need to select a book').trim().isLength({ min: 1 }),

  catchErr(async (req, res, next) => {
    const errors = validationResult(req);
    const club = new Club({
      name: req.body.name,
      _id: req.params.clubId
    });

    if (req.body.password !== process.env.PASSWORD) {
      return res.render('club_form', {
        title: 'Update Club',
        club,
        isUpdate: true,
        invalidPass: { msg: 'Invalid Password' }
      });
    }

    if (!errors.isEmpty()) {
      return res.render('club_form', {
        title: 'Create a Club',
        club,
        isUpdate: true,
        errors: errors.array()
      });
    }

    const newClub = await Club.findByIdAndUpdate(req.params.clubId, club, {
      new: true
    });
    res.redirect(newClub.url);
  })
];
