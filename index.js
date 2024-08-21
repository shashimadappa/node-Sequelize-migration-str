require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/routes/index');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Hello, World! Running in ${ENV} mode.`);
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} in ${ENV} mode`);
});
