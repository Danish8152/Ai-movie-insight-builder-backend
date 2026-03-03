const express = require('express');
const router = express.Router();
const movieController = require('./movieController');

router.get('/movie/:imdbId', movieController.getMovieDetails);

module.exports = router;