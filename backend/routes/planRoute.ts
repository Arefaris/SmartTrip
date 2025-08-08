import { Router } from "express";
import { planController } from "../controllers/planController";


export const planRouter = Router()
planRouter.post("/plan", planController)