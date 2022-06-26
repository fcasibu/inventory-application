const Book = require('../models/book');

exports.index = async (req, res, next) => {
  try {
    // exec to make this a "fully-fledged promise"
    // no difference only a better stack trace
    const books = await Book.find()
      .populate('author')
      .populate('chapter_count')
      .sort('-createdAt')
      .limit(4)
      .exec();

    if (books.length <= 0) {
      return res.render('index');
    }

    res.render('index', { books });
  } catch (err) {
    next(err);
  }
};
