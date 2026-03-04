const { getMovieFromOMDb } = require('../src/omdbService');
const { getFullCast } = require('../src/tmdbService');

const getMovieDetails = async (req, res) => {
    try {
        const { imdbId } = req.params;

        if (!imdbId.startsWith('tt')) {
            return res.status(400).json({ error: 'Invalid IMDb ID' });
        }

        // 1️⃣ Get basic movie info
        const movieData = await getMovieFromOMDb(imdbId);

        if (movieData.Response === 'False') {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // 2️⃣ Get full cast
        const fullCast = await getFullCast(imdbId);

        // 3️⃣ Send clean structured response
        res.json({
            title: movieData.Title,
            year: movieData.Year,
            rating: movieData.imdbRating,
            plot: movieData.Plot,
            poster: movieData.Poster,
            cast: fullCast.slice(0, 20).map(actor => ({
                name: actor.name,
                character: actor.character,
                profile: actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : null
            }))
        });

    } catch (error) {
        console.error('FULL ERROR:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMovieDetails };