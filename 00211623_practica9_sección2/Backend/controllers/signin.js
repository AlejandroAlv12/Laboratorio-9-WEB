import { pool } from '../database.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../keys/keys.js'

// /signin -> valida email + password y devuelve JWT
export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email])
    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: 'Usuario o contraseña inválidos' })
    }

    const user = rows[0]
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Usuario o contraseña inválidos' })
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: '8h',
    })

    return res.status(200).json({ token, user })
  } catch (err) {
    console.error('signin error:', err.message)
    return res.status(500).json({ message: 'Error en el servidor', error: err.message })
  }
}
