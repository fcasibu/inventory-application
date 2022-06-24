const Book = require('../models/book');
const Author = require('../models/author');

exports.index = async (req, res, next) => {
  try {
    const books = await Book.find()
      .populate('author')
      .populate('chapter_count')
      .limit(4);

    if (books.length <= 0) {
      return res.render('index');
    }

    res.render('index', { book_list: books });
  } catch (err) {
    next(err);
  }
};
