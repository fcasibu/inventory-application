const { body, validationResult } = require('express-validator');
const Club = require('../models/club');
const Book = require('../models/book');
const Thread = require('../models/thread');
const ThreadComment = require('../models/threadComment');
const Member = require('../models/member');

exports.club_list_get = async (req, res, next) => {
  // I don't know if I should just use aggregation?
  const clubs = await Club.find()
    .populate('book', 'title')
    .populate('member_count')
    .populate('thread_count')
    .sort('member_count')
    .exec();

  const bookCategory = clubs.reduce((result, club) => {
    if (!result[club.book.title]) {
      result[club.book.title] = [];
    }

    result[club.book.title].push(club);

    return result;
  }, {});
  res.render('club_list', { bookCategory });
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
  try {
    const books = await Book.find({}, 'title').exec();

    res.render('club_form', { title: 'Create a Club', books });
  } catch (err) {
    next(err);
  }
};

exports.club_create_post = [
  body('name', 'A club name must have a minimum length of 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('book', 'You need to select a book').trim().isLength({ min: 1 }),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const club = new Club({
        name: req.body.name,
        book: req.body.book
      });

      if (!errors.isEmpty()) {
        const books = await Book.find({}, 'title').exec();

        return res.render('club_form', {
          title: 'Create a Club',
          books,
          club,
          errors: errors.array()
        });
      }

      await club.save();
      res.redirect(club.url);
    } catch (err) {
      next(err);
    }
  }
];

exports.club_delete_get = async (req, res, next) => {
  try {
    const club = await Club.findById(req.params.clubId, 'name');
    res.render('club_delete', { club });
  } catch (err) {
    next(err);
  }
};

exports.club_delete_post = async (req, res, next) => {
  try {
    if (req.body.password === process.env.PASSWORD) {
      await Club.findByIdAndDelete(req.params.clubId);
      res.redirect('/clubs');
    } else {
      const club = await Club.findById(req.params.clubId, 'name');
      res.render('club_delete', { club, error: { msg: 'Invalid Password' } });
    }
  } catch (err) {
    next(err);
  }
};

exports.club_update_get = async (req, res, next) => {
  try {
    const club = Club.findById(req.params.clubId);
    const book = Book.find({}, 'title');
    const [targetClub, books] = await Promise.all([club, book]);

    res.render('club_form', { club: targetClub, books, isUpdate: true });
  } catch (err) {
    next(err);
  }
};

exports.club_update_post = [
  body('name', 'A club name must have a minimum length of 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('book', 'You need to select a book').trim().isLength({ min: 1 }),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const books = await Book.find({}, 'title').exec();
      const club = new Club({
        name: req.body.name,
        book: req.body.book,
        _id: req.params.clubId
      });

      if (req.body.password !== process.env.PASSWORD) {
        return res.render('club_form', {
          title: 'Update Club',
          club,
          books,
          isUpdate: true,
          invalidPass: { msg: 'Invalid Password' }
        });
      }

      if (!errors.isEmpty()) {
        return res.render('club_form', {
          title: 'Create a Club',
          books,
          club,
          isUpdate: true,
          errors: errors.array()
        });
      }

      const newClub = await Club.findByIdAndUpdate(req.params.clubId, club, {
        new: true
      });
      res.redirect(newClub.url);
    } catch (err) {
      next(err);
    }
  }
];
