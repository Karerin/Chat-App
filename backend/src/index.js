import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectDB } from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 5001

app.use(express.json())// so that we can access req.body
app.use(cookieParser())
//to fix cors error because we are sending from frontend to backend with different ports :5173 and :5001
app.use(
  cors({
    origin: "http://localhost:5173", //process.env.CLIENT_URL,
    credentials: true,// this allows the cookies and the authorization headers to be sent with the requests
  })
)

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectDB()
})
