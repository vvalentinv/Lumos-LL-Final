//declarations
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const client = require('./db/connection');
// const { getAllUsers } = require('./db/queries');

//env variables
const { PORT, ENVIRONMENT } = process.env;

// console.log(process.env);

//routes requires
const userRoutes = require('./routes/users');
const deckRoutes = require('./routes/decks');
const cardRoutes = require('./routes/cards');
const categoriesRoutes = require('./routes/categories');

//middleware
const app = express();

app.use(morgan(ENVIRONMENT));
// new way of using middleware bodyParser
// app.use(bodyParser.json());

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
