const axios = require('axios');

const getMovieFromOMDb = async (imdbId) => {
    const url = `http://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`;
    
    const response = await axios.get(url);

    return response.data;
};

module.exports = { getMovieFromOMDb };