import e from "express"
import { planRouter } from "./routes/planRoute"
import { userRouter } from "./routes/userRoute"
const app = e()

app.use(e.json()) // body parser for post requests
const PORT = 5001 //TODO: add port from env


app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})

app.use("/api/", planRouter)
app.use("/api/", userRouter)