import express from "express"
const app = express();
import cookieParser from "cookie-parser"
import cors from 'cors'

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4175",
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))


import user from "./Routes/user.routes.js"
import product from "./Routes/product.routes.js"
import file from "./Routes/file.routes.js"

app.use("/api/user", user)
app.use("/api/product", product)
app.use("/api/file", file)


export { app }