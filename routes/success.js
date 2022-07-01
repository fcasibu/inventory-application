const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('success', { message: 'Added to Inventory' });
});

module.exports = router;
