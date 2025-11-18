import { pool } from '../database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, HASH_COMPLEXITY } from '../keys/keys.js'

// /signup -> crea usuario con contraseña hasheada y devuelve JWT
export const signup = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // comprobar si el email ya existe
    const { rows: existing } = await pool.query('SELECT id FROM users WHERE email = $1 LIMIT 1', [email])
    if (existing && existing.length > 0) {
      return res.status(409).json({ message: 'El email ya está registrado' })
    }

    const hash = await bcrypt.hash(password, HASH_COMPLEXITY || 10)
    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hash]
    )

    const user = rows[0]
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '8h' })

    return res.status(201).json({ user, token })
  } catch (err) {
    console.error('signup error:', err.message)
    return res.status(500).json({ message: 'Error al crear usuario', error: err.message })
  }
}
