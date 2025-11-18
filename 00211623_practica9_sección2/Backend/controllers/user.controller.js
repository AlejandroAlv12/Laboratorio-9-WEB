// controllers/user.controller.js
export { displayHome } from './displayHome.js'
export { getUsers } from './getUsers.js'
export { signin } from './signin.js'
export { signup } from './signup.js'
export { updateUser } from './updateUser.js'
export { deleteUser } from './deleteUser.js'
// Backwards-compatibility aliases (routes may still import the old names)
export { signin as getUserById } from './signin.js'
export { signup as createUser } from './signup.js'
