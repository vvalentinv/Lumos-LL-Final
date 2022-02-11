//declarations
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');

//env variables
const {PORT, ENVIRONMENT} = process.env;

//routes requires
const deckRoutes = require('./routes/decks');

// middleware
const app = express();
app.use(morgan(ENVIRONMENT));
app.use(bodyParser.json());

//routes
app.use('/decks', deckRoutes());

app.get('/', (req, res) => {
  res.json({ home: `It's home` });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
