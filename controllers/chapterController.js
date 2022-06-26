const { body, validationResult } = require('express-validator');
const Chapter = require('../models/chapter');
const Book = require('../models/book');

exports.chapter_detail_get = async (req, res, next) => {
  try {
    const chapters = await Chapter.find({ book: req.params.bookId });
    if (!req.query.page) {
      return res.redirect(`/books/${req.params.bookId}`);
    }

    if (+req.query.page === 0 || Number.isNaN(+req.query.page))
      return res.redirect(`/books/${req.params.bookId}`);

    if (!chapters[+req.query.page - 1]) {
      return res.render('chapter_detail', {
        error: { msg: 'Chapter not found' },
        bookId: req.params.bookId,
        leftPage: +req.query.page - 1
      });
    }

    res.render('chapter_detail', {
      chapter: chapters[+req.query.page - 1],
      bookId: req.params.bookId,
      leftPage: +req.query.page - 1,
      rightPage: +req.query.page + 1
    });
  } catch (err) {
    next(err);
  }
};

exports.chapter_create_get = (req, res, next) => {
  res.render('chapter_form', { title: 'Create Chapter' });
};

exports.chapter_create_post = [
  body('title', 'A title must have a minimum length of 3')
    .trim()
    .isLength({ min: 3 }),
  body('text', 'Content must have a minimum length of 10')
    .trim()
    .isLength({ min: 10 }),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const book = await Book.findById(req.params.bookId).populate(
        'chapter_count'
      );
      const chapter = new Chapter({
        title: req.body.title,
        text: req.body.text,
        book
      });

      if (!errors.isEmpty()) {
        return res.render('chapter_form', {
          title: 'Create Chapter',
          chapter,
          errors: errors.array()
        });
      }

      await chapter.save();
      res.redirect(`${book.url}/chapters?page=${book.chapter_count + 1}`);
    } catch (err) {
      next(err);
    }
  }
];

exports.chapter_update_get = async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);

    res.render('chapter_form', {
      title: 'Update Chapter',
      chapter,
      isUpdate: true
    });
  } catch (err) {
    next(err);
  }
};

exports.chapter_update_post = [
  body('title', 'A title must have a minimum length of 3')
    .trim()
    .isLength({ min: 3 }),
  body('text', 'Content must have a minimum length of 10')
    .trim()
    .isLength({ min: 10 }),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const book = await Book.findById(req.params.bookId);
      const chapter = new Chapter({
        title: req.body.title,
        text: req.body.text,
        book,
        _id: req.params.chapterId
      });

      if (req.body.password !== process.env.PASSWORD) {
        return res.render('chapter_form', {
          title: ' Update Chapter',
          chapter,
          isUpdate: true,
          invalidPass: { msg: 'Invalid Password' }
        });
      }

      if (!errors.isEmpty()) {
        return res.render('chapter_form', {
          title: 'Update Chapter',
          chapter,
          errors: errors.array(),
          isUpdate: true
        });
      }
      await Chapter.findByIdAndUpdate(req.params.chapterId, chapter);
      res.redirect(`${book.url}`);
    } catch (err) {
      next(err);
    }
  }
];
