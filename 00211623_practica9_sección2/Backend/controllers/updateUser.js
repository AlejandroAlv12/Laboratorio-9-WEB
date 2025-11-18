import { pool } from '../database.js'

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email } = req.body
    const result = await pool.query(
      'UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *',
      [name, email, id]
    )
    return res.json(result.rows[0])
  } catch (err) {
    console.error('updateUser error:', err.message)
    return res.status(500).json({ message: 'Error al actualizar usuario', error: err.message })
  }
}
