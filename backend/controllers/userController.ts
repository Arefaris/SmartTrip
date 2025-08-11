import { createUser } from "../models/userModel"
import { Request, Response } from "express"
import { getUserByEmail } from "../models/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { registerSchema } from "../config/joi"
import { loginSchema } from "../config/joi"
import "../types"

export const registerUser = async(req: Request, res: Response) => {
        

        //validating password and email
        const result = registerSchema.validate(req.body)

        if (result.error) {
          
            const errorMessage = result.error.details[0].message;

            res.status(400).json({
                message: errorMessage
            });

            return
        }
        
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
                return
            }
            res.status(500).json({message: "Internal server error"})
            
        }
    }

export const loginUser = async (req: Request, res: Response) => {
       
        
        //validating password and email
        const result = loginSchema.validate(req.body)

        if (result.error) {
          
            const errorMessage = result.error.details[0].message;

            res.status(400).json({
                message: errorMessage
            });

            return
        }
         
        const {email, password} = req.body

        // checking if user with this email exist
        try {
            const user = await getUserByEmail(email)

            if(!user) {
                res.status(404).json({message: 
                    "Invalid credentials"
                })
                return
            }
            
            //comparing hash of passwords
            const match = await bcrypt.compare(password+"", user.password_hash)

            if (!match) {
                 res.status(404).json({message: 
                    "Invalid credentials"
                })
                return
            }

            //generate token
            const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
            if(!ACCESS_TOKEN_SECRET){
                res.status(500).json({message: "Iternal server Error, no acces token found"})
                return
            }

            const accessToken = jwt.sign(
                {userid: user.id, email: user.email},
                ACCESS_TOKEN_SECRET,
                {expiresIn: "7d"}
            )

            //set token on HttpOnlyCokie
            res.cookie("token", accessToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
                httpOnly: true,
            })


            //response with token
            res.status(200).json({
                message: "Login successfully",
                user: {userid: user.id, email: user.email, user: "active"},
                token: accessToken
            })


        }catch (error) {
            console.log(error)
            res.status(500).json({message: "internal server error"})
        }
    }

export const logOutUser = (req: Request, res: Response) => {
        try {
            res.clearCookie("token");

            if(req.cookies && req.cookies.token) {
                delete req.cookies.token;
            }
            res.sendStatus(200)
        }catch (error){
            console.log(error)
            res.sendStatus(500)
        }
    }

export const verifyAuth = (req: Request, res: Response) => {
        if (!req.user) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }

        const {userid, email} = req.user;
        const {ACCESS_TOKEN_SECRET} = process.env;
        
        if(!ACCESS_TOKEN_SECRET){
            console.log("No acces token")
            res.sendStatus(500)
            return
        }
        const newToken = jwt.sign({userid, email}, ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        })

        res.cookie("token", newToken, {
            maxAge: 15 * 60 * 1000, //15 minutes in milliseconds
            httpOnly: true
        })

        res.status(200).json({
            message: "new token",
            user: {userid, email},
            token: newToken
        })

}