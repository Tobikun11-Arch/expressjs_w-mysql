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

    res.status(201).json({
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
    res.status(200).json({users: rows});
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
    res.status(200).json({users: rows[0] || []});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// PUT - full update
router.put('/update-user/:id', async (req, res) => {
  const {first_name, last_name} = req.body;

  try {
    const [update_result] = await pool.query(
      'UPDATE users SET first_name = ?, last_name = ? WHERE user_id = 2',
      [first_name, last_name]
    );

    res.status(200).json({message: "User updated successfully"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// PATCH - partial update
router.patch('/update-changes/:id', async (req, res) => {
  const fields = []
  const values = []

  Object.entries(req.body).forEach(([key, value]) => {
    fields.push(`${key} = ?`),
    values.push(value)
  })

  if(fields.length === 0) {
    return res.status(400).json({message: "No fields updates"})
  }

  try {
    const [result] = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`,
      [...values, req.params.id]
    )

    if(result.affectedRows === 0) {
      return res.status(404).json({message: "User not found!"})
    }

    res.status(200).json({message: "user updated successfully"})

  } catch (error) {
    res.status(500).json({error: error.message})
  }
});

export default router;
