const axios = require('axios');

const getMovieFromOMDb = async (imdbId) => {
  const response = await axios.get(
    `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`
  );

  return response.data;
};

module.exports = { getMovieFromOMDb };