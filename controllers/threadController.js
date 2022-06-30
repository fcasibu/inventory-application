const { body, validationResult } = require('express-validator');
const Thread = require('../models/thread');
const ThreadComment = require('../models/threadComment');
const Club = require('../models/club');

exports.thread_detail_get = async (req, res, next) => {
  try {
    const thread = await Thread.findById(req.params.threadId)
      .populate('comment_list')
      .exec();

    res.render('thread_detail', { thread });
  } catch (err) {
    next(err);
  }
};

exports.thread_create_get = (req, res, next) => {
  res.render('thread_form', { title: 'Create a Thread' });
};

exports.thread_create_post = [
  body('title', 'A title must have a minimum length of 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body(
    'description',
    'A description must have a minimum length of 3 characters'
  )
    .trim()
    .isLength({ min: 3 })
    .escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const club = await Club.findById(req.params.clubId);
      const thread = new Thread({
        title: req.body.title,
        description: req.body.description,
        club
      });

      if (!errors.isEmpty()) {
        return res.render('thread_form', {
          title: 'Create a Thread',
          thread,
          errors: errors.array()
        });
      }

      await thread.save();
      res.redirect(thread.url);
    } catch (err) {
      next(err);
    }
  }
];

exports.threadComment_create_post = [
  body(
    'text',
    'A comment must have a min length of 3 characters and a max length of 500 characters'
  )
    .trim()
    .isLength({ min: 3, max: 500 }),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const thread = await Thread.findById(req.params.threadId)
        .populate('comment_list')
        .exec();

      const comment = new ThreadComment({
        text: req.body.text,
        thread
      });

      if (!errors.isEmpty()) {
        return res.render('thread_detail', {
          thread,
          threadComment: comment,
          errors: errors.array()
        });
      }

      await comment.save();
      res.redirect(thread.url);
    } catch (err) {
      next(err);
    }
  }
];
