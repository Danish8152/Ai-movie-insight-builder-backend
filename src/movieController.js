const { getMovieFromOMDb } = require('../src/omdbService');
const { getFullCast } = require('../src/tmdbService');

const getMovieDetails = async (req, res) => {
    try {
        const { imdbId } = req.params;

        // Validate IMDb ID
        if (!imdbId.startsWith('tt')) {
            return res.status(400).json({ error: 'Invalid IMDb ID' });
        }

        // 1️⃣ Get basic movie info from OMDB
        const movieData = await getMovieFromOMDb(imdbId);

        if (movieData.Response === 'False') {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // 2️⃣ Get full cast from TMDB
        const fullCast = await getFullCast(imdbId);

        // 3️⃣ Generate Sentiment Based on Rating
        const ratingNumber = parseFloat(movieData.imdbRating) || 0;

        let overall;
        let summary;

        if (ratingNumber >= 8) {
            overall = "Positive";
            summary = `With an IMDb rating of ${ratingNumber}, the film has been widely appreciated by audiences. Viewers particularly praise its performances, production quality, and overall impact. Many consider it a strong entry in its genre.`;
        } 
        else if (ratingNumber >= 6) {
            overall = "Mixed";
            summary = `With an IMDb rating of ${ratingNumber}, audience reactions are fairly divided. While some viewers highlight its strengths, others feel certain aspects like pacing or storytelling could have been stronger. Overall, reception sits in the middle ground.`;
        } 
        else {
            overall = "Negative";
            summary = `With an IMDb rating of ${ratingNumber}, audience reception has leaned negative. Many viewers have expressed concerns regarding execution, narrative, or overall engagement. The film struggled to meet broader expectations.`;
        }

        // 4️⃣ Send Final Response
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
            })),
            sentiment: {
                overall,
                summary
            }
        });

    } catch (error) {
        console.error('FULL ERROR:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMovieDetails };