const { body, validationResult } = require('express-validator');
const catchErr = require('../utils/catchErr');
const Thread = require('../models/thread');
const Club = require('../models/club');

exports.thread_detail_get = catchErr(async (req, res, next) => {
  const thread = await Thread.findById(req.params.threadId).exec();

  res.render('thread_detail', { thread });
});

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

  catchErr(async (req, res, next) => {
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
  })
];

exports.threadComment_create_post = [
  body(
    'text',
    'A comment must have a min length of 3 characters and a max length of 500 characters'
  )
    .trim()
    .isLength({ min: 3, max: 500 }),

  catchErr(async (req, res, next) => {
    const errors = validationResult(req);
    const thread = await Thread.findById(req.params.threadId).exec();

    if (!errors.isEmpty()) {
      return res.render('thread_detail', {
        thread,
        threadComment: req.body.text,
        errors: errors.array()
      });
    }
    const newThread = await Thread.findByIdAndUpdate(
      req.params.threadId,
      {
        $push: {
          comments: req.body.text
        }
      },
      { new: true }
    ).exec();
    res.redirect(newThread.url);
  })
];
