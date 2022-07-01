const { body, validationResult } = require('express-validator');
const catchErr = require('../utils/catchErr');
const Author = require('../models/author');
const Book = require('../models/book');

exports.author_list_get = catchErr(async (req, res, next) => {
  const authors = await Author.find().populate('book_count').exec();

  res.render('author_list', { authors });
});

exports.author_detail_get = catchErr(async (req, res, next) => {
  const author = Author.findById(req.params.authorId).exec();
  const book = Book.find({ author: req.params.authorId })
    .populate('chapter_count')
    .exec();

  const [targetAuthor, books] = await Promise.all([author, book]);

  res.render('author_detail', { author: targetAuthor, books });
});

exports.author_form_get = (req, res) => {
  res.render('author_form', { title: 'Create Author' });
};

exports.author_form_post = [
  body('name', 'A name must have a minimum length of 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('photoURL').trim(),

  catchErr(async (req, res, next) => {
    const errors = validationResult(req);

    const author = new Author({
      name: req.body.name,
      photoURL:
        req.body.photoURL ||
        'https://cdn-icons-png.flaticon.com/512/1160/1160326.png?w=740'
    });

    if (!errors.isEmpty()) {
      return res.render('author_form', { title: 'Create Author', author });
    }

    await author.save();
    res.redirect('/authors');
  })
];
