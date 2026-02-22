import express from 'express';
import pool from '../db.js';

const router = express.Router();

//#1 CRUD to mysql

//Create
router.post('/register', async (req, res) => {
  const {first_name, last_name, email, password} = req.body;

  try {
    const [post_result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) values (?, ?, ?, ?)',
      [first_name, last_name, email, password]
    );

    res.json({
      id: post_result.insertId,
      first_name,
      last_name,
      email,
      password
    });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

//Read (all)
router.get('/view-users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json({users: rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

//Read (one)
router.get('/view-user/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [
      req.params.id
    ]);
    res.json({users: rows[0] || []});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

//Update - specific update
router.put('/update-user/:id', async (req, res) => {
  const {first_name, last_name} = req.body;

  try {
    const [update_result] = await pool.query(
      'UPDATE users set first_name = ?, last_name = ? WHERE user_id = 2',
      [first_name, last_name]
    );

    res.json({id: update_result.insertId, first_name, last_name});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});



export default router;
