const express = require('express');
const app = express();
const pool = require('./db.js');
const createAndSeed = require ('./seed.js');
const routes = require('./routes.js')
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');
});

app.use('/api/v1',routes);

createAndSeed();

