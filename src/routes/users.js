import express from 'express';
import pool from '../db.js';

const router = express.Router();

//#1 CRUD to mysql

//Create
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json({users: rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

//Read (one)
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [
      req.params.id
    ]);

    if(rows.length === 0) {
      return res.status(404).json({message: "User not found!"})
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// PATCH - update specific fields only
router.patch('/:id', async (req, res) => {
  const fields = [];
  const values = [];
  const allowedFields = ['first_name', 'last_name', 'email', 'password'];

  Object.entries(req.body).forEach(([key, value]) => {
    if (!allowedFields.includes(key)) return;
    fields.push(`${key} = ?`), values.push(value);
  });

  if (fields.length === 0) {
    return res.status(400).json({message: 'No valid fields to updates'});
  }

  try {
    const [result] = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE user_id = ?`,
      [...values, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'User not found!'});
    }

    res.status(200).json({message: 'user updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// PUT - If replacing everything (expect complete data)

export default router;
