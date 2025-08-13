import { Request, Response } from "express"
import { getCities } from "../models/cityCountryAutoModel"



export const countyController = async (req: Request, res: Response)=>{
    const {query} = req.body
    const result = await getCities(query)
    res.json({result: result})
}