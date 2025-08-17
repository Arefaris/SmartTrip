import { Request, Response } from "express"
import { getPhotos } from "../models/pexelsModel"

export const getLocationPhoto = async (req: Request, res: Response)=>{
    const {query} = req.body
    
    try {
        const result = await getPhotos(query)
        res.json({result: result})
    }catch (error) {
        res.json({result: error})
    }
    
   
}