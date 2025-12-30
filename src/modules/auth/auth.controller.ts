import { Request, Response } from "express";
import authServices from "./auth.service";

const signup = async(req: Request, res: Response) => {
    try {
        const result = await authServices.signup(req.body); 
        // console.log(result);
        const user = result.rows[0]; 
        res.status(201).json({
            "success": true,
            "message": "User registered successfully",
            "data": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "phone": user.phone,
                "role": user.role
            }
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false, 
            message: err.message
        })
    }
}

const authControllers = {
    signup, 
}; 

export default authControllers;