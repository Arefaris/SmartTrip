import { createUser } from "../models/userModel"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async(req: Request, res: Response) => {
        const {password, email} = req.body
        
        try { 
            const user = await createUser(password, email)

            res.status(201).json({
                message: "User registered succefully",
                user
            })

        } catch (error: any) {
            console.log(error)

            if(error.code === "23505"){
                res.status(404).json({message: "User already exist"})
            }
            res.status(500).json({message: "Internal server error"})
        }
    }