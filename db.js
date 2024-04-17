const {Pool} = require('pg');
const pool = new Pool({
  connectionString: 'postgresql://postgres@127.0.0.1:5432/postgres'
});

module.exports = pool;