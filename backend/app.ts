import e from "express"
import { createPlan } from "./models/planModel"
import { Plan } from "./types"
import { planRouter } from "./routes/planRoute"
const app = e()

app.use(e.json()) // body parser for post requests
const PORT = 5001 //TODO: add port from env


app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})

app.use("/api/", planRouter)