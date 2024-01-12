const express = require('express');
const router = express.Router();
const controller = require('../controllers/book');

router.get('/online_books/:searchType/:searchSubject', controller.onlineSearchBook);
router.post('/libraryBook', controller.saveLibraryBook);
router.get('/libraryBook/toread/:toread', controller.toread);
router.get('/libraryBook/reading/:reading', controller.reading);
router.get('/libraryBook/favorites/:favorites', controller.favorites);
router.get('/libraryBook/readagain/:readagain', controller.readagain);

module.exports = router;