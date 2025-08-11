import { Router } from "express"
import { logOutUser, registerUser } from "../controllers/userController"
import { loginUser } from "../controllers/userController"
import { authLimiter } from "../middlewares/rateLimiter"
export const userRouter = Router()
userRouter.post("/login", authLimiter, loginUser)
userRouter.post("/register", authLimiter, registerUser)
userRouter.post("/logout", logOutUser)