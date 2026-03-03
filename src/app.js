const express = require('express');
const cors = require('cors');
const movieRoutes = require('./movieRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', movieRoutes);

module.exports = app;