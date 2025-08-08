import e from "express"
import { planRouter } from "./routes/planRoute"
import { userRouter } from "./routes/userRoute"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = e()

app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}))

app.use(e.json()) // body parser for post requests
app.use(cookieParser()) // cookie parser for reading cookies
const PORT = 5001 //TODO: add port from env


app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}`)
})

app.use("/api/", planRouter)
app.use("/api/", userRouter)