import { Request, Response } from "express"
import { Plan } from "../types"
import { createPlan } from "../models/planModel"

export const planController = async (req: Request, res: Response)=>{
    const plan = await createPlan(req.body as Plan)
    res.json({plan: plan})
}