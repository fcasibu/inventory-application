const express = require('express');
const authorController = require('../controllers/authorController');

const router = express.Router();

// Get request for all the authors
router.get('/', authorController.author_list_get);

// Get request for author creation
router.get('/create', authorController.author_form_get);

// Post request for author creation
router.post('/create', authorController.author_form_post);

// Get request for a specific author
router.get('/:authorId', authorController.author_detail_get);

module.exports = router;
