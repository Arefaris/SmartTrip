import e from "express"
import { db } from "./config/db"

const app = e()

app.use(e.json()) // body parser for post requests
const PORT = 5001 //TODO: add port from env

// Test database connection

app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})

app.post("/api/plan", (req, res)=>{
    console.log(req.body)
    res.json({message: "got it"})
})