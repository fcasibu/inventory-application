const { body, validationResult } = require('express-validator');
const Thread = require('../models/thread');
const Club = require('../models/club');

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
