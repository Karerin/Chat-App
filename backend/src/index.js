import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import path from "path" // built-in module in nodejs

import { connectDB } from "./lib/db.js"
import { app, server } from "./lib/socket.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

dotenv.config()
// const app = express() // moved to socket.js from lib

const PORT = process.env.PORT || 5001
const __dirname = path.resolve() // to get the current directory path

app.use(express.json({ limit: "10mb" })) // so that we can access req.body
app.use(cookieParser())
//to fix cors error because we are sending from frontend to backend with different ports :5173 and :5001
app.use(
  cors({
    origin: "http://localhost:5173", //process.env.CLIENT_URL,
    credentials: true, // this allows the cookies and the authorization headers to be sent with the requests
  })
)
// console.log("Loading routes...")
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
// console.log("Routes loaded!")

if (process.env.NODE_ENV === "production") {
  // console.log("NODE_ENV:", process.env.NODE_ENV)
  // console.log("MONGODB_URI:", process.env.MONGODB_URI)
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  // })

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

// app.listen(PORT, () => { //replaced by server.listen in socket.js
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  connectDB()
})
