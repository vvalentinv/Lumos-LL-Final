//declarations
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//env variables
const { PORT, ENVIRONMENT } = process.env;

//routes requires
const userRoutes = require('./routes/users');
const deckRoutes = require('./routes/decks');
const cardRoutes = require('./routes/cards');
const categoriesRoutes = require('./routes/categories');

//middleware
const app = express();
app.use(morgan(ENVIRONMENT));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users', userRoutes());
app.use('/api/decks', deckRoutes());
app.use('/api/cards', cardRoutes());
app.use('/api/categories', categoriesRoutes());

app.get('/', (req, res) => {
  res.json({ home: `It's home` });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
