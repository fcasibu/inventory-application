const express = require('express');
const clubController = require('../controllers/clubController');
const threadController = require('../controllers/threadController');

const router = express.Router();

// Get request for all the clubs
router.get('/', clubController.club_list_get);

// Get rqeuest for club creation
router.get('/create', clubController.club_create_get);

// Post request for club creation
router.post('/create', clubController.club_create_post);

// Get request for a specific club
router.get('/:clubId', clubController.club_detail_get);

// Get request for a club deletion
router.get('/:clubId/delete', clubController.club_delete_get);

// Post request for a club deletion
router.post('/:clubId/delete', clubController.club_delete_post);

// Get request for a club update
router.get('/:clubId/update', clubController.club_update_get);

// Post request for a club update
router.post('/:clubId/update', clubController.club_update_post);

// Get request for thread creation
router.get('/:clubId/threads/create', threadController.thread_create_get);

// Post request for thread creation
router.post('/:clubId/threads/create', threadController.thread_create_post);

// Get request for a specific thread
router.get('/:clubId/threads/:threadId', threadController.thread_detail_get);

// Post request for thread comment creation
router.post(
  '/:clubId/threads/:threadId',
  threadController.threadComment_create_post
);

module.exports = router;
