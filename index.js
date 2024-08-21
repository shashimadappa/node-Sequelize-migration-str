require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./src/routes/index');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`Hello, World! Running in ${ENV} mode.`);
});

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} in ${ENV} mode`);
});


// "development": {
//   "username": "postgres",
//   "password": "1234",
//   "database": "lit_school",
//   "host": "127.0.0.1",
//   "dialect": "postgres"
// },

// "username": "postgres.sdndtaybijptmjadrawk",
// "password": "shashi@lit321",
// "database": "postgres",
// "host": "aws-0-ap-south-1.pooler.supabase.com",
// "dialect": "postgres",
// "port": "6543"