const express = require('express');
const bookController = require('../controllers/bookController');

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

module.exports = router;
