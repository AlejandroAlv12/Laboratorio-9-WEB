import { pool } from '../database.js'

// Devuelve todos los usuarios. Soporta ?order=asc|desc
export const getUsers = async (req, res) => {
  try {
    const { order } = req.query

    if (order === 'asc') {
      const { rows } = await pool.query('SELECT * FROM users ORDER BY name ASC')
      return res.json(rows)
    }

    if (order === 'desc') {
      const { rows } = await pool.query('SELECT * FROM users ORDER BY name DESC')
      return res.json(rows)
    }

    const { rows } = await pool.query('SELECT * FROM users')
    return res.json(rows)
  } catch (err) {
    console.error('getUsers error:', err.message)
    return res.status(500).json({ message: 'Error al obtener usuarios', error: err.message })
  }
}

export const getUsersAsc = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY name ASC')
    res.json(rows)
  } catch (err) {
    console.error('getUsersAsc error:', err.message)
    res.status(500).json({ message: 'Error al obtener usuarios (asc)', error: err.message })
  }
}

export const getUsersDesc = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY name DESC')
    res.json(rows)
  } catch (err) {
    console.error('getUsersDesc error:', err.message)
    res.status(500).json({ message: 'Error al obtener usuarios (desc)', error: err.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    res.json(rows[0])
  } catch (err) {
    console.error('getUserById error:', err.message)
    res.status(500).json({ message: 'Error al obtener usuario', error: err.message })
  }
}
