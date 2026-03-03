const { getMovieFromOMDb } = require('./omdbService');

const getMovieDetails = async (req, res) => {
    try {
        const { imdbId } = req.params;

        if (!imdbId.startsWith('tt')) {
            return res.status(400).json({ error: 'Invalid IMDb ID' });
        }

        const movieData = await getMovieFromOMDb(imdbId);

        if (movieData.Response === 'False') {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(movieData);

    } catch (error) {
        console.error("FULL ERROR:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMovieDetails };