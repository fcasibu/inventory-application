const mongoose = require('mongoose');
const Book = require('../models/book');
const Author = require('../models/author');
const Chapter = require('../models/chapter');

exports.index = async (req, res, next) => {
  try {
    const books = await Book.find().populate('author').limit(4);
    const chapters = await Chapter.find();

    if (books.length <= 0) {
      return res.render('index');
    }

    if (chapters.length <= 0) {
      return res.render('index', { book_list: books });
    }

    for (let i = 0; i < books.length; i += 1) {
      let count = 0;
      for (let j = 0; j < chapters.length; j += 1) {
        if (chapters[j].book._id.equals(books[i]._id)) {
          books[i].chapter_count = `${++count}`;
          console.log(books[i].chapter_count);
        }
      }
    }
    res.render('index', { book_list: books, chapter_list: chapters });
  } catch (err) {
    next(err);
  }
};
