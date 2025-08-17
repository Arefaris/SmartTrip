import { Request, Response } from "express"
import { createPlan } from "../models/planModel"
import { getUserPlans } from "../models/planModel"

export const planController = async (req: Request, res: Response)=>{
    try {
       
        // if(!req.user?.userid) {
        //     return res.status(401).json({ error: "No user id" })
        // }
        
        const plan = await createPlan(req.body, req.user?.userid ? req.user?.userid : null)
        
        if (!plan) {
            return res.status(500).json({ error: "Failed to create or retrieve plan" })
        }
        
        res.json({plan})
    } catch (error) {
        console.error('Plan controller error:', error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getPlans = async(req: Request, res: Response)=>{
    try {
        if(!req.user?.userid) {
            return res.status(401).json({ error: "No user id" })
        }
        
        const userPlans = await getUserPlans(req.user?.userid)
        res.json({userPlans: userPlans})
    } catch (error) {
        console.error('Get plans controller error:', error)
        res.status(500).json({ error: "Internal server error" })
    }
}