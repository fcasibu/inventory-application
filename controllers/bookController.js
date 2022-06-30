const { body, validationResult } = require('express-validator');
const catchErr = require('../utils/catchErr');
const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const Tag = require('../models/tag');

exports.book_list_get = catchErr(async (req, res, next) => {
  const books = await Book.find()
    .populate('author')
    .populate({ path: 'genre', limit: 3 })
    .populate('chapter_count')
    .limit(30)
    .exec();

  if (!books.length) return res.render('book_list');
  res.render('book_list', { books });
});

exports.book_detail_get = catchErr(async (req, res, next) => {
  const book = await Book.findById(1)
    .populate('author')
    .populate({ path: 'genre', limit: 3 })
    .populate({ path: 'tag', limit: 5 })
    .populate('chapter_count')
    .populate({
      path: 'chapter_list',
      limit: 20,
      select: 'title createdAt'
    })
    .exec();

  res.render('book_detail', { book });
});

exports.book_create_get = catchErr(async (req, res, next) => {
  const author = Author.find();
  const genre = Genre.find();
  const tag = Tag.find();

  const [authors, genres, tags] = await Promise.all([author, genre, tag]);

  res.render('book_form', {
    title: 'Create Book',
    authors,
    genres,
    tags
  });
});

exports.book_create_post = [
  body('title', 'Title must have a minimum length of 3 characters.')
    .trim()
    .isLength({ min: 3 }),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }),
  body('summary', 'Summary must have a minimum length of 10 characters.')
    .trim()
    .isLength({ min: 10 }),
  body('photoURL').trim(),

  catchErr(async (req, res, next) => {
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
      const author = Author.find().exec();
      const genre = Genre.find().exec();
      const tag = Tag.find().exec();
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
        title: 'Create Book',
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
  })
];

exports.book_delete_get = catchErr(async (req, res, next) => {
  const book = await Book.findById(req.params.bookId);
  res.render('book_delete', { book });
});

exports.book_delete_post = catchErr(async (req, res, next) => {
  if (req.body.password === process.env.PASSWORD) {
    await Book.findByIdAndDelete(req.params.bookId);
    res.redirect('/books');
  } else {
    const book = await Book.findById(req.params.bookId);
    res.render('book_delete', {
      book,
      error: { msg: 'Invalid Password' }
    });
  }
});

exports.book_update_get = catchErr(async (req, res, next) => {
  const book = Book.findById(req.params.bookId)
    .populate('author')
    .populate('genre')
    .populate('tag')
    .exec();
  const author = Author.find().exec();
  const genre = Genre.find().exec();
  const tag = Tag.find().exec();

  const [targetBook, authors, genres, tags] = await Promise.all([
    book,
    author,
    genre,
    tag
  ]);

  for (let i = 0; i < targetBook.genre.length; i++) {
    for (let j = 0; j < genres.length; j++) {
      if (targetBook.genre[i]._id.toString() === genres[j]._id.toString()) {
        genres[j].checked = 'true';
      }
    }
  }

  for (let i = 0; i < targetBook.tag.length; i++) {
    for (let j = 0; j < tags.length; j++) {
      if (targetBook.tag[i]._id.toString() === tags[j]._id.toString()) {
        tags[j].checked = 'true';
      }
    }
  }

  res.render('book_form', {
    title: 'Update Book',
    book: targetBook,
    authors,
    genres,
    tags,
    isUpdate: true
  });
});

exports.book_update_post = [
  body('title', 'Title must have a minimum length of 3 characters.')
    .trim()
    .isLength({ min: 3 }),
  body('author', 'Author must not be empty.').trim().isLength({ min: 1 }),
  body('summary', 'Summary must have a minimum length of 10 characters.')
    .trim()
    .isLength({ min: 10 }),
  body('photoURL').trim(),

  catchErr(async (req, res, next) => {
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
      tag: req.body.tag,
      _id: req.params.bookId
    });
    const author = Author.find().exec();
    const genre = Genre.find().exec();
    const tag = Tag.find().exec();
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

    if (req.body.password !== process.env.PASSWORD) {
      return res.render('book_form', {
        title: 'Update Book',
        authors,
        genres,
        book,
        tags,
        isUpdate: true,
        invalidPass: { msg: 'Invalid Password' }
      });
    }

    if (!errors.isEmpty()) {
      res.render('book_form', {
        title: 'Update Book',
        authors,
        genres,
        book,
        tags,
        isUpdate: true,
        errors: errors.array()
      });
    } else {
      const newBook = await Book.findByIdAndUpdate(req.params.bookId, book, {
        new: true
      });

      res.redirect(newBook.url);
    }
  })
];
