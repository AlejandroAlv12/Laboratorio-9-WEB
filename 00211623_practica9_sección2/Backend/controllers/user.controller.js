// controllers/user.controller.js
export { displayHome } from './displayHome.js'
export { getUsers } from './getUsers.js'
export { signin } from './signin.js'
export { signup } from './signup.js'
export { updateUser } from './updateUser.js'
export { deleteUser } from './deleteUser.js'

// Compatibilidad con nombres antiguos usados en rutas
export { signin as getUserById } from './signin.js'
export { signup as createUser } from './signup.js'
