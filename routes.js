const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/activities', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activities');
    const activities = result.rows;
    res.json(activities);
  } catch (err) {
    console.error('Error fetching activities', err);
    res.status(500).json({ error: 'Error fetching activities' });
  }
});

router.get('/routines', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM routines');
    const routines = result.rows;
    res.json(routines);
  } catch (err) {
    console.error('Error fetching routines', err);
    res.status(500).json({ error: 'Error fetching routines' });
  }
});


module.exports = router;
