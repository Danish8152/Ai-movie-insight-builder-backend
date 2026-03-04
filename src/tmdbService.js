const axios = require('axios');

const BASE_URL = 'https://api.themoviedb.org/3';

const headers = {
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`
};

const getFullCast = async (imdbId) => {

    // Step 1: Convert IMDb ID to TMDb ID
    const findResponse = await axios.get(
        `${BASE_URL}/find/${imdbId}?external_source=imdb_id`,
        { headers }
    );

    if (!findResponse.data.movie_results.length) {
        throw new Error('Movie not found in TMDb');
    }

    const tmdbId = findResponse.data.movie_results[0].id;

    // Step 2: Fetch credits
    const creditsResponse = await axios.get(
        `${BASE_URL}/movie/${tmdbId}/credits`,
        { headers }
    );

    return creditsResponse.data.cast;
};

module.exports = { getFullCast };