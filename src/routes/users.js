import express from 'express';
import pool from '../db.js';

const router = express.Router();

//#1 CRUD to mysql

//Create
router.post('/', async (req, res) => {
  const {first_name, last_name, email, password} = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) values (?, ?, ?, ?)',
      [first_name, last_name, email, password]
    );

    res.status(201).json({
      id: result.insertId,
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

    if (rows.length === 0) {
      return res.status(404).json({message: 'User not found!'});
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// PATCH - update specific fields (not required to update all fields)
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

    res.status(200).json({message: 'User updated successfully'});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// PUT - replacing everything (expect complete data that match in database)
router.put('/:id', async (req, res) => {
  const {first_name, last_name, email, password} = req.body;
  try {
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({message: 'Missing required fields'});
    }

    const [result] = await pool.query(
      'UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE user_id = ?',
      [first_name, last_name, email, password, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'User not found'});
    }

    res.status(200).json({message: 'User updated successfully'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// DELETE - one user
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [
      req.params.id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({message: 'User not found!'});
    }

    res.status(200).json({message: 'User deteled successfully!'});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

//DELETE - all users
router.delete('/', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM users');

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({message: `Deleted ${result.affectedRows} users successfully!`});
    } else {
      res.status(404).json({
        message: 'No users found to delete.'
      });
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

export default router;
