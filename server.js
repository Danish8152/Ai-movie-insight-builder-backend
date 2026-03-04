require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { getMovieDetails } = require('./src/movieController');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/movie/:imdbId', getMovieDetails);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});