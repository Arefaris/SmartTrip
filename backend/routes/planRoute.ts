import { Router } from "express";
import { planController } from "../controllers/planController";
import { authenticateToken, optionalAuth } from "../middlewares/verifyToken";
import { verifyAuth } from "../controllers/userController";
import { getPlans } from "../controllers/planController";
import { countyController } from "../controllers/countryController";
import { getLocationPhoto } from "../controllers/pexelsController";
export const planRouter = Router()

planRouter.post("/photo", getLocationPhoto)
planRouter.post("/plan", optionalAuth, planController)
planRouter.get('/verify-auth', authenticateToken, verifyAuth);
planRouter.get("/user-plans", authenticateToken, getPlans)
planRouter.post("/county-list", countyController)