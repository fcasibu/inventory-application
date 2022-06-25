const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Book = require('../models/book');
const Chapter = require('../models/chapter');
const Comment = require('../models/comment');
const Author = require('../models/author');
const Genre = require('../models/genre');
const Tag = require('../models/tag');

exports.book_list_get = async (req, res, next) => {
  const books = await Book.find()
    .populate('author')
    .populate({ path: 'genre', options: { limit: 3 } })
    .populate('comment_count')
    .populate('chapter_count')
    .populate('chapter_list')
    .limit(30);

  if (!books.length) return res.render('book_list');
  res.render('book_list', { books });
};

exports.book_detail_get = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.bookId)
      .populate('author')
      .populate('genre', 'name')
      .populate('tag', 'name')
      .populate('chapter_count')
      .populate('chapter_list');

    res.render('book_detail', { book });
  } catch (err) {
    next(err);
  }
};

exports.book_create_get = async (req, res, next) => {
  try {
    const author = Author.find();
    const genre = Genre.find();
    const tag = Tag.find();

    const [authors, genres, tags] = await Promise.all([author, genre, tag]);

    res.render('book_form', {
      title: 'Create a Book',
      authors,
      genres,
      tags
    });
  } catch (err) {
    return next(err);
  }
};

exports.book_create_post = [
  body('title', 'Title must have a minimum length of 3 characters.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('author', 'Author must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('summary', 'Summary must have a minimum length of 10 characters.')
    .trim()
    .isLength({ min: 10 })
    .escape(),
  body('photoURL').trim(),
  body('price').escape(),
  body('genre.*').escape(),
  body('tag.*').escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const book = new Book({
        title: req.body.title,
        author: req.body.author,
        photoURL:
          req.body.photoURL ||
          'https://fivebooks.com/app/uploads/2010/09/no_book_cover.jpg',
        price: req.body.price,
        summary: req.body.summary,
        genre: req.body.genre,
        tag: req.body.tag
      });

      if (!errors.isEmpty()) {
        const author = Author.find();
        const genre = Genre.find();
        const tag = Tag.find();
        const [authors, genres, tags] = await Promise.all([author, genre, tag]);

        for (let i = 0; i < genres.length; i++) {
          if (book.genre.includes(genres[i]._id)) {
            genres[i].checked = 'true';
          }
        }
        for (let i = 0; i < tags.length; i++) {
          if (book.tag.includes(tags[i]._id)) {
            tags[i].checked = 'true';
          }
        }

        res.render('book_form', {
          title: 'Create a Book',
          authors,
          genres,
          book,
          tags,
          errors: errors.array()
        });
      } else {
        await book.save();
        res.redirect(book.url);
      }
    } catch (err) {
      next(err);
    }
  }
];

exports.book_delete_get = async (req, res, next) => {
  res.send('Not yet implemented');
};
exports.book_delete_post = async (req, res, next) => {
  res.send('Not yet implemented');
};

exports.book_update_get = async (req, res, next) => {
  res.send('Not yet implemented');
};

exports.book_update_post = async (req, res, next) => {
  res.send('Not yet implemented');
};
