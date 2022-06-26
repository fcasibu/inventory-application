const express = require('express');
const bookController = require('../controllers/bookController');
const chapterController = require('../controllers/chapterController');

const router = express.Router();

// Get request for all the books
router.get('/', bookController.book_list_get);

// Get request for book creation
router.get('/create', bookController.book_create_get);

// Post request for book creation
router.post('/create', bookController.book_create_post);

// Get request for specific a specific book
router.get('/:bookId', bookController.book_detail_get);

// Get request for book deletion
router.get('/:bookId/delete', bookController.book_delete_get);

// Post request for book deletion
router.post('/:bookId/delete', bookController.book_delete_post);

// Get request for book update
router.get('/:bookId/update', bookController.book_update_get);

// Post request for book update
router.post('/:bookId/update', bookController.book_update_post);

// Get request for all the book's chapters
router.get('/:bookId/chapters', chapterController.chapter_detail_get);

// Get request for chapter creation
router.get('/:bookId/chapters/create', chapterController.chapter_create_get);

// Post request for chapter creation
router.post('/:bookId/chapters/create', chapterController.chapter_create_post);

// Get request for chapter update
router.get(
  '/:bookId/chapters/:chapterId/update',
  chapterController.chapter_update_get
);

// Post request for chapter update
router.post(
  '/:bookId/chapters/:chapterId/update',
  chapterController.chapter_update_post
);

module.exports = router;
