//declarations
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt');
// const client = require('./db/connection');
const { getAllUsers } = require('./db/queries');

//env variables
const { PORT, ENVIRONMENT } = process.env;

// console.log(process.env);

//routes requires
const deckRoutes = require('./routes/decks');
const userRoutes = require('./routes/users');

// middleware
const app = express();
app.use(morgan(ENVIRONMENT));
app.use(bodyParser.json());

//routes
app.use('/decks', deckRoutes());
app.use('/api/users',userRoutes());

app.get('/', (req, res) => {
  res.json({ home: `It's home` });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
