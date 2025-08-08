import { Router } from "express"
import { logOutUser, registerUser } from "../controllers/userController"
import { loginUser } from "../controllers/userController"

export const userRouter = Router()
userRouter.post("/login", loginUser)
userRouter.post("/register", registerUser)
userRouter.post("/logout", logOutUser)