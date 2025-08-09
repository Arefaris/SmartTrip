import { Router } from "express";
import { planController } from "../controllers/planController";
import { authenticateToken } from "../middlewares/verifyToken";
import { verifyAuth } from "../controllers/userController";
import { getPlans } from "../controllers/planController";

export const planRouter = Router()

planRouter.post("/plan", authenticateToken, planController)
planRouter.get('/verify-auth', authenticateToken, verifyAuth);
planRouter.get("/user-plans", authenticateToken, getPlans)