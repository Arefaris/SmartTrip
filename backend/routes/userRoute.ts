import { Router } from "express"
import { registerUser } from "../controllers/userController"


export const userRouter = Router()

userRouter.post("/register", registerUser)