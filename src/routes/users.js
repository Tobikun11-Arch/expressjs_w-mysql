import express from 'express'
import pool from '../db.js'

const router = express.Router()

//#1 CRUD to mysql

//Create
router.post('/register', async (req,res) => {
  const {first_name, last_name, email, password} = req.body;

  try {
    const [post_result] = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password) values (?, ?, ?, ?)',
      [first_name, last_name, email, password]
    )

    res.json({id: post_result.insertId, first_name, last_name, email, password})
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router;