const Book = require('../models/book');
const Chapter = require('../models/chapter');
const Comment = require('../models/comment');
const Genre = require('../models/genre');

exports.book_list_get = async (req, res, next) => {
  const books = await Book.find()
    .populate('author')
    .populate('genre')
    .populate('comment_count')
    .populate('chapter_count')
    .populate('comment_list')
    .limit(30);

  if (!books.length) return res.render('book_list');
  res.render('book_list', { books });
};

exports.book_detail_get = async (req, res, next) => {
  res.send('Not yet implemnted');
};

exports.book_create_get = async (req, res, next) => {
  res.send('Not yet implemented');
};

exports.book_create_post = async (req, res, next) => {
  res.send('Not yet implemented');
};

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
