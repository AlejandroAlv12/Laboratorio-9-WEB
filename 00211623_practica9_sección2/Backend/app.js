import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import userRoutes from "./routes/user.routes.js"
import verifyToken from "./middlewares/verifyToken.js"
import { pool } from "./database.js"
import { PORT, JWT_SECRET } from "./keys/keys.js"
import { signup } from './controllers/user.controller.js'
import { signin } from './controllers/user.controller.js'

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Bienvenido a la API de usuarios 🧪")
})

// Rutas públicas de autenticación
app.post('/signup', signup)
app.post('/signin', signin)

app.get("/protected", verifyToken, (req, res) => {
    res.json({
        message: "¡Has accedido a la ruta protegida!",
        user: req.user,
    })
})

app.use("/", verifyToken, userRoutes)

app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
)
