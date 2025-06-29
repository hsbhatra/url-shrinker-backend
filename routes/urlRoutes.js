const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// POST /url/shorten
router.post('/url/shorten', urlController.createShortUrl);

// GET /:urlCode
router.get('/:urlCode', urlController.getOriginalUrl);

module.exports = router;
