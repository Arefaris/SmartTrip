import { Request, Response } from "express"
import { createPlan } from "../models/planModel"
import { getUserPlans } from "../models/planModel"

export const planController = async (req: Request, res: Response)=>{
    if(!req.user?.userid) throw new Error("No user id")
    const plan = await createPlan(req.body, req.user?.userid)
    res.json({plan})
}

export const getPlans = async(req: Request, res: Response)=>{
    if(!req.user?.userid) throw new Error("No user id")
    const userPlans = await getUserPlans(req.user?.userid)
    res.json({userPlans: userPlans})
}